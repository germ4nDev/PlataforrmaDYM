import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTablesModule, DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { PTLRoleAP } from 'src/app/theme/shared/_helpers/models/PTLRoleAP.model';
import { BreadcrumbComponent } from 'src/app/theme/shared/components/breadcrumb/breadcrumb.component';
import { PTLRolesAPService } from 'src/app/theme/shared/service/ptlroles-ap.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, DataTablesModule, SharedModule, BreadcrumbComponent],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss'
})
export class RolesComponent implements OnInit, AfterViewInit {
[x: string]: any;
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;

  dtColumnSearchingOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  rolesAP: PTLRoleAP[] = [];

  constructor(
    private router: Router,
    private rolService: PTLRolesAPService,
    private BreadCrumb: BreadcrumbComponent
  ) {}

  ngOnInit() {
    this.dtColumnSearchingOptions = {
      responsive: true,
      columns: [
        { title: 'Nombre', data: 'nombreRole' },
        { title: 'Descripción', data: 'descripcionRole' },
        { title: 'Estado', data: 'estadoRole' },
        { title: 'Opciones', data: 'opciones' }
      ]
    };

    this.consultarRoles();
  }
  consultarRoles() {
    this.rolService.getRoles().subscribe((roles: any) => {
      console.log('Todos los roles', roles.resp.data);
      this.rolesAP = roles.resp.data;
      this.dtTrigger.next(null); // <--- Dispara la actualización de la tabla
    });
  }

  ngAfterViewInit(): void {
    this.BreadCrumb.setBreadcrumb();
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.columns().every(function () {
        const that = this;
        $('input', this.header()).on('keyup change', function () {
          const valor = $(this).val() as string;
          if (that.search() !== valor) {
            that.search(valor).draw();
          }
        });
      });
    });
  }

  filtrarColumna(columna: number, valor: string) {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.column(columna).search(valor).draw();
    });
  }

  getEstado(estado: boolean): string {
    return estado ? 'Activo' : 'Inactivo';
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe(); // <--- Destruye el trigger para evitar memory leaks
  }
  nuevoRol() {
    this.router.navigate(['/roles/new-roles']);
  }

  editarRol(id: number) {
    this.router.navigate(['/roles/new-roles'], { queryParams: { roleId: id } });
  }

  eliminarRol(id: number, nombre: string) {
    Swal.fire({
      title: '¿Estás seguro de eliminar?',
      text: `¡estas apunto de eliminar el rol "${nombre}".!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.rolService.deleteRole(id).subscribe({
          next: (resp: any) => {
            Swal.fire('Eliminado', resp.mensaje, 'success');
            this.rolesAP = this.rolesAP.filter((s) => s.roleId !== id);
          },
          error: (err: any) => {
            Swal.fire('Error', 'No se pudo eliminar el rol.', 'error');
            console.error('Error eliminando', err);
          }
        });
      }
    });
  }
}
