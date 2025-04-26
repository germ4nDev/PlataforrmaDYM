import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NarikCustomValidatorsModule } from '@narik/custom-validators';
import { BreadcrumbComponent } from 'src/app/theme/shared/components/breadcrumb/breadcrumb.component';
import { PTLLicenciasService } from 'src/app/theme/shared/service/ptlLicencias.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import Swal from 'sweetalert2';

export class FormLicencia {
    licenciaId!: number;
    suscriptorId!: number;
    aplicacionId!: number;
    nombreLicencia!: string;
    descripcionLicencia!: string;
    estadoLicencia!: boolean;
    fechaCreacion!: date;
    fechaVencimiento!: date;
  }

@Component({
  selector: 'app-new-licencia',
  standalone: true,
  imports: [CommonModule, SharedModule, NarikCustomValidatorsModule],
  templateUrl: './new-licencia.component.html',
  styleUrl: './new-licencia.component.scss'
})
export class NewLicenciaComponent {
  FormLicencia!: FormLicencia;
  form: undefined;
  isSubmit: boolean;
  modoEdicion: boolean = false;

  constructor(
    private router: Router,
    private licenciasService: PTLLicenciasService,
    private route: ActivatedRoute,
    private BreadCrumb: BreadcrumbComponent
  ) {
    this.isSubmit = false;
  }

  ngOnInit() {
    this.BreadCrumb.setBreadcrumb();
    this.route.queryParams.subscribe((params) => {
      const id = params['licenciaId'];
      console.log('me llena el Id', id);

      if (id) {
        this.modoEdicion = true;
        this.licenciasService.getLicenciaById(+id).subscribe({
          next: (resp: any) => {
            this.FormLicencia = resp.data;
          },
          error: () => {
            Swal.fire('Error', 'No se pudo obtener la licencia', 'error');
          }
        });
      } else {
        this.modoEdicion = false;
        this.FormLicencia = {
          licenciaId: 0,
          suscriptorId: 0,
          aplicacionId: 0,
          nombreLicencia: '',
          descripcionLicencia: '',
          estadoLicencia: true,
          fechaCreacion: date.Now,
          fechaVencimiento: date.Now
        };
      }
    });
  }

  btnInsertEditLicencia(form: any) {
    this.isSubmit = true;

    if (!form.valid) {
      return;
    }

    if (this.modoEdicion) {
      this.licenciasService.modificarLicencias(this.FormLicencia).subscribe({
        next: (resp: any) => {
          if (resp.ok) {
            Swal.fire('', 'La licencia se modificó correctamente', 'success');
            this.router.navigate(['/licencias/licencias']);
          } else {
            Swal.fire('Error', resp.message || 'No se pudo actualizar la licencia', 'error');
          }
        },
        error: (err: any) => {
          console.error(err);
          Swal.fire('Error', 'No se pudo actualizar la licencia', 'error');
        }
      });
    } else {
      this.licenciasService.insertarLicencias(this.FormLicencia).subscribe({
        next: (resp: any) => {
          if (resp.ok) {
            Swal.fire('', 'La licencia se insertó correctamente', 'success');
            form.resetForm();
            this.isSubmit = false;
            this.router.navigate(['/licencias/licencias']);
          }
        },
        error: (err: any) => {
          console.error(err);
          Swal.fire('Error', 'No se pudo insertar la licencia', 'error');
        }
      });
    }
  }

  btnRegresarLicencia() {
    this.router.navigate(['/licencias/licencias']);
  }
}
