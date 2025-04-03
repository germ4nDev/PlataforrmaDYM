import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Router} from '@angular/router';
import { PTLSitiosAP } from 'src/app/theme/shared/_helpers/models/PTLSitioAP.model';
import { PTLSitiosAPService } from 'src/app/theme/shared/service/ptlsitios-ap.service';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CardComponent } from "../../../theme/shared/components/card/card.component";

@Component({
  selector: 'app-sites',
  standalone: true,
  imports: [CommonModule, DataTablesModule, CardComponent],
  templateUrl: './sites.component.html',
  styleUrl: './sites.component.scss'
})
export class SitesComponent implements OnInit, AfterViewInit {
    [x: string]: any;
    @ViewChild(DataTableDirective, { static: false })
    datatableElement!: DataTableDirective;

dtColumnSearchingOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  sitiosAP: PTLSitiosAP[]=[];

  constructor(private router: Router, private sitiosService:PTLSitiosAPService) {}

  ngOnInit() {
    this.dtColumnSearchingOptions = {
        // pagingType: 'full_numbers',
        responsive: true,
        columns: [
          { title: 'Nombre', data: 'nombreSitio' },
          { title: 'Descripción', data: 'descripcionSitio' },
          { title: 'URL', data: 'urlSitio' },
          { title: 'Puerto Sitio', data: 'puertoSitio' },
          { title: 'Estado', data: 'estadoSitio' }
        ]
      };

      this.consultarSitios();
  }
  consultarSitios () {
this.sitiosService.getSitios().subscribe((sitios:any) => {
    console.log('Todos los sitios', sitios.resp.data);
    this.sitiosAP = sitios.resp.data;
    this.dtTrigger.next(null);// <--- Dispara la actualización de la tabla
});
  }

  ngAfterViewInit(): void {
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
  nuevoSitio() {
    this.router.navigate(['/sites/new-site']);
  }
}
