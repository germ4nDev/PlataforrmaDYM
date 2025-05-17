import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NarikCustomValidatorsModule } from '@narik/custom-validators';
import { BreadcrumbComponent } from 'src/app/theme/shared/components/breadcrumb/breadcrumb.component';
import { PTLConexionesBDService } from 'src/app/theme/shared/service/ptlconexiones-bd.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import Swal from 'sweetalert2';


export class FormConexion {
  conexionId!: number;
  aplicacionId!: number;
  suscriptorId!: number;
  nombreConexion!: string;
  descripcionConexion!: string;
  estadoConexion!: boolean;
  nombreServidor!: string;
  BDNombre!: string;
  BDUser!: string;
  BDPassword!: string;
  BDPort!: number;
}

@Component({
  selector: 'app-new-conexion',
  standalone: true,
  imports: [CommonModule, SharedModule, NarikCustomValidatorsModule],
  templateUrl: './new-conexion.component.html',
  styleUrl: './new-conexion.component.scss'
})
export class NewConexionComponent {
  FormConexion!: FormConexion;
  form: undefined;
  isSubmit: boolean;
  modoEdicion: boolean = false;

  constructor(
    private router: Router,
    private conexionesService: PTLConexionesBDService,
    private route: ActivatedRoute,
    private BreadCrumb: BreadcrumbComponent
  ) {
    this.isSubmit = false;
  }

  ngOnInit() {
    this.BreadCrumb.setBreadcrumb();
    this.route.queryParams.subscribe((params) => {
      const id = params['sitioId'];
      console.log('me llena el Id', id);

      if (id) {
        this.modoEdicion = true;
        this.conexionesService.getConexionById(+id).subscribe({
          next: (resp: any) => {
            this.FormConexion = resp.data;
          },
          error: () => {
            Swal.fire('Error', 'No se pudo obtener la conexión', 'error');
          }
        });
      } else {
        this.modoEdicion = false;
        this.FormConexion = {
          conexionId: 0,
          aplicacionId: 0,
          suscriptorId: 0,
          nombreConexion: '',
          descripcionConexion: "",
          estadoConexion: true,
          nombreServidor: "",
          BDNombre: "",
          BDUser: "",
          BDPassword: "",
          BDPort: 0,
        };
      }
    });
  }

  btnInsertEditConexion(form: any) {
    this.isSubmit = true;

    if (!form.valid) {
      return;
    }

    if (this.modoEdicion) {
      this.conexionesService.updateConexion(this.FormConexion).subscribe({
        next: (resp: any) => {
          if (resp.ok) {
            Swal.fire('', 'La conexión se modificó correctamente', 'success');
            this.router.navigate(['/administracion-bd/conexiones']);
          } else {
            Swal.fire('Error', resp.message || 'No se pudo actualizar la conexión', 'error');
          }
        },
        error: (err: any) => {
          console.error(err);
          Swal.fire('Error', 'No se pudo actualizar la conexión', 'error');
        }
      });
    } else {
      this.conexionesService.createConexion(this.FormConexion).subscribe({
        next: (resp: any) => {
          if (resp.ok) {
            Swal.fire('', 'La conexión se insertó correctamente', 'success');
            form.resetForm();
            this.isSubmit = false;
            this.router.navigate(['/administracion-bd/conexiones']);
          }
        },
        error: (err: any) => {
          console.error(err);
          Swal.fire('Error', 'No se pudo insertar la conexión', 'error');
        }
      });
    }
  }

  btnRegresarConexion() {
    this.router.navigate(['/administracion-bd/conexiones']);
  }
}
