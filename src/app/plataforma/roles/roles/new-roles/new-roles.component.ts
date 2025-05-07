import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NarikCustomValidatorsModule } from '@narik/custom-validators';
import { BreadcrumbComponent } from 'src/app/theme/shared/components/breadcrumb/breadcrumb.component';
import { PTLRolesAPService } from 'src/app/theme/shared/service/ptlroles-ap.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import Swal from 'sweetalert2';

export class formRol {
  roleId!: number;
  aplicacionId!: number;
  nombreRole!: string;
  descripcionRole!: string;
  estadoRole!: boolean;
}

@Component({
  selector: 'app-new-roles',
  standalone: true,
  imports: [CommonModule, SharedModule, NarikCustomValidatorsModule],
  templateUrl: './new-roles.component.html',
  styleUrl: './new-roles.component.scss'
})
export class NewRolesComponent {
  formRol!: formRol;
  form: undefined;
  isSubmit: boolean;
  modoEdicion: boolean = false;

  constructor(
    private router: Router,
    private rolService: PTLRolesAPService,
    private route: ActivatedRoute,
    private BreadCrumb: BreadcrumbComponent
  ) {
    this.isSubmit = false;
  }

  ngOnInit() {
    this.BreadCrumb.setBreadcrumb();
    this.route.queryParams.subscribe((params) => {
      const id = params['roleId'];
      console.log('me llena el Id', id);

      if (id) {
        this.modoEdicion = true;
        this.rolService.getRoleById(+id).subscribe({
          next: (resp: any) => {
            this.formRol = resp.data;
          },
          error: () => {
            Swal.fire('Error', 'No se pudo obtener el rol', 'error');
          }
        });
      } else {
        this.modoEdicion = false;
        this.formRol = {
          roleId: 0,
          aplicacionId: 0,
          nombreRole: '',
          descripcionRole: '',
          estadoRole: true
        };
      }
    });
  }

  btnInsertEditRol(form: any) {
    this.isSubmit = true;

    if (!form.valid) {
      return;
    }

    if (this.modoEdicion) {
      this.rolService.updateRole(this.formRol).subscribe({
        next: (resp: any) => {
          if (resp.ok) {
            Swal.fire('', 'El rol se modificó correctamente', 'success');
            this.router.navigate(['/roles/roles']);
          } else {
            Swal.fire('Error', resp.message || 'No se pudo actualizar el Roles', 'error');
          }
        },
        error: (err: any) => {
          console.error(err);
          Swal.fire('Error', 'No se pudo actualizar el Roles', 'error');
        }
      });
    } else {
      this.rolService.createRole(this.formRol).subscribe({
        next: (resp: any) => {
          if (resp.ok) {
            Swal.fire('', 'El Roles se insertó correctamente', 'success');
            form.resetForm();
            this.isSubmit = false;
            this.router.navigate(['/roles/roles']);
          }
        },
        error: (err: any) => {
          console.error(err);
          Swal.fire('Error', 'No se pudo insertar el rol', 'error');
        }
      });
    }
  }

  btnRegresarRol() {
    this.router.navigate(['/roles/roles']);
  }
}
