import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DataTablesModule, DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { PTLConexionBD } from 'src/app/theme/shared/_helpers/models/PTLConexionBD.model';
import { BreadcrumbComponent } from 'src/app/theme/shared/components/breadcrumb/breadcrumb.component';
import { PTLConexionesBDService } from 'src/app/theme/shared/service/ptlconexiones-bd.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-conexciones',
  standalone: true,
  imports: [CommonModule, DataTablesModule, SharedModule, BreadcrumbComponent],
  templateUrl: './conexiones.component.html',
  styleUrl: './conexiones.component.scss'
})
export class ConexionesComponent implements OnInit, AfterViewInit {
    [x: string]: any;
    @ViewChild(DataTableDirective, { static: false })
    datatableElement!: DataTableDirective;

    dtColumnSearchingOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject<any>();
    conexionBD: PTLConexionBD []=[];

  constructor(
    private router: Router,
    private conexionService:PTLConexionesBDService,
    private BreadCrumb : BreadcrumbComponent
  ) {}

  ngOnInit() {

    this.dtColumnSearchingOptions = {
        responsive: true,
        columns: [
          { title: 'Nombre', data: 'nombreConexion' },
          { title: 'Descripción', data: 'descripcionConexion' },
          { title: 'Estado', data: 'estadoConexion' },
          { title: 'nombre Servidor', data: 'nombreServidor' },
          { title: 'BDNombre', data: 'BDNombre' },
          { title: 'BDUser', data: 'BDUser' },
          { title: 'BDPassword', data: 'BDPassword' },
          { title: 'BDPort', data: 'BDPort' },
          { title: 'Opciones', data: 'opciones' },
        ]
      };

      this.consultarConexion();
  }

  consultarConexion () {
    this.conexionService.getConexiones().subscribe((conexion:any) => {
        console.log('Todos los Conexion', conexion.resp.data);
        this.conexionBD = conexion.resp.data;
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
  nuevaConexion() {
    this.router.navigate(['/administracion-bd/new-conexion']);
  }

  editarConexion(id: number) {
    this.router.navigate(['/sites/new-site'], { queryParams: { conexionId: id } });
  }

  eliminarConexion(id: number, nombre: string) {
    Swal.fire({
      title: '¿Estás seguro de eliminar?',
      text: `¡estas apunto de eliminar la Conexion "${nombre}".!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.conexionService.deleteConexion(id).subscribe({
          next: (resp:any) => {
            Swal.fire('Eliminado', resp.mensaje, 'success');
            this.conexionBD = this.conexionBD.filter(s => s.conexionId !== id);
          },
          error: (err:any) => {
            Swal.fire('Error', 'No se pudo eliminar la Conexion.', 'error');
            console.error('Error eliminando', err);
          }
        });
      }
    });
  }
}
