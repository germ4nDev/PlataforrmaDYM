import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTablesModule, DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { PTLEmpresaSC } from 'src/app/theme/shared/_helpers/models/PTLEmpresaSC.model';
import { BreadcrumbComponent } from 'src/app/theme/shared/components/breadcrumb/breadcrumb.component';
import { PTLEmpresasSCService } from 'src/app/theme/shared/service/ptlempresas-sc.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empresas',
  standalone: true,
  imports: [CommonModule, DataTablesModule, SharedModule, BreadcrumbComponent],
  templateUrl: './empresas.component.html',
  styleUrl: './empresas.component.scss'
})
export class EmpresasComponent implements OnInit, AfterViewInit {
[x: string]: any;
    @ViewChild(DataTableDirective, { static: false })
    datatableElement!: DataTableDirective;

    dtColumnSearchingOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject<any>();
    empresaSC: PTLEmpresaSC []=[];

  constructor(
    private router: Router,
    private empresaService:PTLEmpresasSCService,
    private BreadCrumb : BreadcrumbComponent
  ) {}

  ngOnInit() {

    this.dtColumnSearchingOptions = {
        responsive: true,
        columns: [
          { title: 'Nombre', data: 'nombreEmpresa' },
          { title: 'Descripción', data: 'descripcionEmpresa' },
          { title: 'Estado', data: 'estadoEmpresa' },
          { title: 'Opciones', data: 'opciones' },
        ]
      };

      this.consultarEmpresas();
  }

  consultarEmpresas () {
    this.empresaService.getEmpresas().subscribe((Empresa:any) => {
        console.log('Todos los Empresas', Empresa.resp.data);
        this.empresaSC = Empresa.resp.data;
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
  nuevaEmpresa() {
    this.router.navigate(['/suscriptor/new-empresa']);
  }

  editarEmpresa(id: number) {
    this.router.navigate(['/suscriptor/new-empresa'], { queryParams: { empresaId: id } });
  }

  eliminarEmpresa(id: number, nombre: string) {
    Swal.fire({
      title: '¿Estás seguro de eliminar?',
      text: `¡estas apunto de eliminar la empresa "${nombre}".!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.empresaService.deleteEmpresa(id).subscribe({
          next: (resp:any) => {
            Swal.fire('Eliminado', resp.mensaje, 'success');
            this.empresaSC = this.empresaSC.filter(s => s.empresaId !== id);
          },
          error: (err:any) => {
            Swal.fire('Error', 'No se pudo eliminar la Empresa.', 'error');
            console.error('Error eliminando', err);
          }
        });
      }
    });
  }
}
