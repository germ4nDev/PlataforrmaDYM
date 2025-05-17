import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NarikCustomValidatorsModule } from '@narik/custom-validators';
import { BreadcrumbComponent } from 'src/app/theme/shared/components/breadcrumb/breadcrumb.component';
import { PTLEmpresasSCService } from 'src/app/theme/shared/service/ptlempresas-sc.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import Swal from 'sweetalert2';

export class FormEmpresa {
  empresaId!: number;
  suscriptorId!: number;
  nombreEmpresa!: string;
  descripcionEmpresa!: string;
  estadoEmpresa!: boolean;
}

@Component({
  selector: 'app-new-empresa',
  standalone: true,
  imports: [CommonModule, SharedModule, NarikCustomValidatorsModule],
  templateUrl: './new-empresa.component.html',
  styleUrl: './new-empresa.component.scss'
})
export class NewEmpresaComponent {
  FormEmpresa!: FormEmpresa;
  form: undefined;
  isSubmit: boolean;
  modoEdicion: boolean = false;

  constructor(
    private router: Router,
    private empresaService: PTLEmpresasSCService,
    private route: ActivatedRoute,
    private BreadCrumb: BreadcrumbComponent
  ) {
    this.isSubmit = false;
  }

  ngOnInit() {
    this.BreadCrumb.setBreadcrumb();
    this.route.queryParams.subscribe((params) => {
      const id = params['empresaId'];
      console.log('me llena el Id', id);

      if (id) {
        this.modoEdicion = true;
        this.empresaService.getEmpresaById(+id).subscribe({
          next: (resp: any) => {
            this.FormEmpresa = resp.data;
          },
          error: () => {
            Swal.fire('Error', 'No se pudo obtener la Empresa', 'error');
          }
        });
      } else {
        this.modoEdicion = false;
        this.FormEmpresa = {
          empresaId: 0,
          suscriptorId: 0,
          nombreEmpresa: '',
          descripcionEmpresa: '',
          estadoEmpresa: true
        };
      }
    });
  }

  btnInsertEditEmpresa(form: any) {
    this.isSubmit = true;

    if (!form.valid) {
      return;
    }

    if (this.modoEdicion) {
      this.empresaService.updateEmpresa(this.FormEmpresa).subscribe({
        next: (resp: any) => {
          if (resp.ok) {
            Swal.fire('', 'La empresa se modificó correctamente', 'success');
            this.router.navigate(['/suscriptor/empresas']);
          } else {
            Swal.fire('Error', resp.message || 'No se pudo actualizar el Empresa', 'error');
          }
        },
        error: (err: any) => {
          console.error(err);
          Swal.fire('Error', 'No se pudo actualizar la Empresa', 'error');
        }
      });
    } else {
      this.empresaService.createEmpresa(this.FormEmpresa).subscribe({
        next: (resp: any) => {
          if (resp.ok) {
            Swal.fire('', 'La empresa se insertó correctamente', 'success');
            form.resetForm();
            this.isSubmit = false;
            this.router.navigate(['/suscriptor/empresas']);
          }
        },
        error: (err: any) => {
          console.error(err);
          Swal.fire('Error', 'No se pudo insertar la Empresa', 'error');
        }
      });
    }
  }

  btnRegresarEmpresa() {
    this.router.navigate(['/suscriptor/empresas']);
  }
}
