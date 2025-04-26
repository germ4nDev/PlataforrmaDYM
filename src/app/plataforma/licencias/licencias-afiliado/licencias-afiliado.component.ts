import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTablesModule, DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { PTLLicencias } from 'src/app/theme/shared/_helpers/models/PTLLicencias.model';
import { BreadcrumbComponent } from 'src/app/theme/shared/components/breadcrumb/breadcrumb.component';
import { PTLLicenciasService } from 'src/app/theme/shared/service/ptlLicencias.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-licencias-afiliado',
  standalone: true,
  imports: [CommonModule, DataTablesModule, SharedModule, BreadcrumbComponent],
  templateUrl: './licencias-afiliado.component.html',
  styleUrl: './licencias-afiliado.component.scss'
})
export class LicenciasAfiliadoComponent implements OnInit, AfterViewInit {
  [x: string]: any;
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;

  dtColumnSearchingOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  licenciasAP: PTLLicencias[] = [];

  constructor(
    private router: Router,
    private licenciasService: PTLLicenciasService,
    private BreadCrumb: BreadcrumbComponent
  ) {}

  ngOnInit() {
    this.dtColumnSearchingOptions = {
      responsive: true,
      columns: [
        { title: 'Nombre', data: 'nombreLicencia' },
        { title: 'Descripción', data: 'descripcionLicencia' },
        { title: 'Fecha Creación', data: 'fechaCreacion' },
        { title: 'Fecha Vencimiento', data: 'fechaVencimiento' },
        { title: 'Estado', data: 'estadoLicencia' },
        { title: 'Opciones', data: 'opciones' }
      ]
    };

    this.consultarLicencias();
  }
  consultarLicencias() {
    this.licenciasService.getLicencias().subscribe((licencia: any) => {
      console.log('Todos los licencia', licencia.resp.data);
      this.licenciasAP = licencia.resp.data;
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
  nuevaLicencia() {
    this.router.navigate(['/licencias/new-licencia']);
  }

  editarLicencia(id: number) {
    this.router.navigate(['/licencias/new-licencia'], { queryParams: { licenciaId: id } });
  }

  eliminarLicencias(id: number, nombre: string) {
    Swal.fire({
      title: '¿Estás seguro de eliminar?',
      text: `¡estas apunto de eliminar la licencia "${nombre}".!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.licenciasService.eliminarLicencias(id).subscribe({
          next: (resp: any) => {
            Swal.fire('Eliminado', resp.mensaje, 'success');
            this.licenciasAP = this.licenciasAP.filter((s) => s.licenciaId !== id);
          },
          error: (err: any) => {
            Swal.fire('Error', 'No se pudo eliminar la licencia.', 'error');
            console.error('Error eliminando', err);
          }
        });
      }
    });
  }
}
