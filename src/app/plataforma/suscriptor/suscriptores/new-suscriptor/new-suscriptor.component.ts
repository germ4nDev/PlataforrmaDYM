import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NarikCustomValidatorsModule } from '@narik/custom-validators';
import { BreadcrumbComponent } from 'src/app/theme/shared/components/breadcrumb/breadcrumb.component';
import { PTLSuscriptoresService } from 'src/app/theme/shared/service/ptlsuscriptores.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import Swal from 'sweetalert2';

export class FormSuscriptor {
  suscriptorId!: number;
  nombreSuscriptor!: string;
  descripcionSuscriptor!: string;
  estadoSuscriptor!: boolean;
}

@Component({
  selector: 'app-new-suscriptor',
  standalone: true,
  imports: [CommonModule, SharedModule, NarikCustomValidatorsModule],
  templateUrl: './new-suscriptor.component.html',
  styleUrl: './new-suscriptor.component.scss'
})
export class NewSuscriptorComponent {
  FormSuscriptor!: FormSuscriptor;
  form: undefined;
  isSubmit: boolean;
  modoEdicion: boolean = false;

  constructor(
    private router: Router,
    private suscriptorService: PTLSuscriptoresService,
    private route: ActivatedRoute,
    private BreadCrumb: BreadcrumbComponent
  ) {
    this.isSubmit = false;
  }

  ngOnInit() {
    this.BreadCrumb.setBreadcrumb();
    this.route.queryParams.subscribe((params) => {
      const id = params['suscriptorId'];
      console.log('me llena el Id', id);

      if (id) {
        this.modoEdicion = true;
        this.suscriptorService.getSuscriptorById(+id).subscribe({
          next: (resp: any) => {
            this.FormSuscriptor = resp.data;
          },
          error: () => {
            Swal.fire('Error', 'No se pudo obtener el suscriptor', 'error');
          }
        });
      } else {
        this.modoEdicion = false;
        this.FormSuscriptor = {
          suscriptorId: 0,
          nombreSuscriptor: '',
          descripcionSuscriptor: '',
          estadoSuscriptor: true
        };
      }
    });
  }

  btnInsertEditSuscriptor(form: any) {
    this.isSubmit = true;

    if (!form.valid) {
      return;
    }

    if (this.modoEdicion) {
      this.suscriptorService.updateSuscriptor(this.FormSuscriptor).subscribe({
        next: (resp: any) => {
          if (resp.ok) {
            Swal.fire('', 'El suscriptor se modificó correctamente', 'success');
            this.router.navigate(['/suscriptor/suscriptores']);
          } else {
            Swal.fire('Error', resp.message || 'No se pudo actualizar el suscriptor', 'error');
          }
        },
        error: (err: any) => {
          console.error(err);
          Swal.fire('Error', 'No se pudo actualizar el suscriptor', 'error');
        }
      });
    } else {
      this.suscriptorService.createSuscriptor(this.FormSuscriptor).subscribe({
        next: (resp: any) => {
          if (resp.ok) {
            Swal.fire('', 'El suscriptor se insertó correctamente', 'success');
            form.resetForm();
            this.isSubmit = false;
            this.router.navigate(['/suscriptor/suscriptores']);
          }
        },
        error: (err: any) => {
          console.error(err);
          Swal.fire('Error', 'No se pudo insertar el suscriptor', 'error');
        }
      });
    }
  }

  btnRegresarSuscriptor() {
    this.router.navigate(['/suscriptor/suscriptores']);
  }
}
