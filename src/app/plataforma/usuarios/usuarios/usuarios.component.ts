import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTablesModule, DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { PTLUsuario } from 'src/app/theme/shared/_helpers/models/PTLUsuario.model';
import { BreadcrumbComponent } from 'src/app/theme/shared/components/breadcrumb/breadcrumb.component';
import { PTLUsuariosService } from 'src/app/theme/shared/service/ptlusuarios.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, DataTablesModule, SharedModule, BreadcrumbComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent implements OnInit, AfterViewInit {
    [x: string]: any;
    @ViewChild(DataTableDirective, { static: false })
    datatableElement!: DataTableDirective;

dtColumnSearchingOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  usuarios: PTLUsuario[]=[];

  constructor(private router: Router,
    private usuariosService : PTLUsuariosService,
    private BreadCrumb: BreadcrumbComponent
) {}

  ngOnInit() {
    this.dtColumnSearchingOptions = {
        responsive: true,
        columns: [
          { title: 'Foto', data: 'fotoUsuario' },
          { title: 'Identificación', data: 'identificacionUsuario' },
          { title: 'Nombre', data: 'nombreUsuario' },
          { title: 'Descripción', data: 'descripcionUsuario' },
          { title: 'Correo', data: 'correoUsuario' },
          { title: 'clave', data: 'claveUsuario' },
          { title: 'Estado', data: 'estadoUsuario' },
          { title: 'Opciones', data: 'opciones' },
        ]
      };

      this.consultarUsuarios();
  }
  consultarUsuarios () {
    this.usuariosService.getUsuarios().subscribe((usuarios:any) => {
        console.log('Todos los usuarios', usuarios.resp.data);
        this.usuarios = usuarios.resp.data;
        this.dtTrigger.next(null);// <--- Dispara la actualización de la tabla
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
  nuevoUsuario() {
    this.router.navigate(['/usuarios/new-usuario']);
  }

  editarUsuario(id: number) {
    this.router.navigate(['/usuarios/new-usuario'], { queryParams: { usuarioId: id } });
  }

  eliminarUsuario(id: number, nombre: string) {
    Swal.fire({
      title: '¿Estás seguro de eliminar?',
      text: `¡estas apunto de eliminar el usuario "${nombre}".!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuariosService.eliminarUsuarios(id).subscribe({
          next: (resp:any) => {
            Swal.fire('Eliminado', resp.mensaje, 'success');
            this.usuarios = this.usuarios.filter(s => s.usuarioId !== id);
          },
          error: (err:any) => {
            Swal.fire('Error', 'No se pudo eliminar el usuario.', 'error');
            console.error('Error eliminando', err);
          }
        });
      }
    });
  }
}
