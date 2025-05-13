import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTablesModule, DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { PTLSuscriptor } from 'src/app/theme/shared/_helpers/models/PTLSuscriptor.model';
import { BreadcrumbComponent } from 'src/app/theme/shared/components/breadcrumb/breadcrumb.component';
import { PTLSuscriptoresService } from 'src/app/theme/shared/service/ptlsuscriptores.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-suscriptores',
  standalone: true,
  imports: [CommonModule, DataTablesModule, SharedModule, BreadcrumbComponent],
  templateUrl: './suscriptores.component.html',
  styleUrl: './suscriptores.component.scss'
})
export class SuscriptoresComponent implements OnInit, AfterViewInit{
[x: string]: any;
    @ViewChild(DataTableDirective, { static: false })
    datatableElement!: DataTableDirective;

    dtColumnSearchingOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject<any>();
    suscriptores: PTLSuscriptor[]=[];

  constructor(
    private router: Router,
    private suscriptorService:PTLSuscriptoresService,
    private BreadCrumb : BreadcrumbComponent
  ) {}

  ngOnInit() {

    this.dtColumnSearchingOptions = {
        responsive: true,
        columns: [
          { title: 'Nombre', data: 'nombreSuscriptor' },
          { title: 'Descripción', data: 'descripcionSuscriptor' },
          { title: 'Estado', data: 'estadoSuscriptor' },
          { title: 'Opciones', data: 'opciones' },
        ]
      };

      this.consultarSuscriptores();
  }

  consultarSuscriptores () {
    this.suscriptorService.getSuscriptores().subscribe((suscriptor:any) => {
        console.log('Todos los Suscriptores', suscriptor.resp.data);
        this.suscriptores = suscriptor.resp.data;
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
  nuevoSuscriptor() {
    this.router.navigate(['/suscriptor/new-suscriptor']);
  }

  editarSuscriptor(id: number) {
    this.router.navigate(['/suscriptor/new-suscriptor'], { queryParams: { SuscriptorId: id } });
  }

  eliminarSuscriptor(id: number, nombre: string) {
    Swal.fire({
      title: '¿Estás seguro de eliminar?',
      text: `¡estas apunto de eliminar a el Suscriptor "${nombre}".!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.suscriptorService.deleteSuscriptor(id).subscribe({
          next: (resp:any) => {
            Swal.fire('Eliminado', resp.mensaje, 'success');
            this.suscriptores = this.suscriptores.filter(s => s.suscriptorId !== id);
          },
          error: (err:any) => {
            Swal.fire('Error', 'No se pudo eliminar el Suscriptor.', 'error');
            console.error('Error eliminando', err);
          }
        });
      }
    });
  }
}
