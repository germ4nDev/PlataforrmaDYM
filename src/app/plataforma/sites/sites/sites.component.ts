import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Router} from '@angular/router';
import { PTLSitiosAP } from 'src/app/theme/shared/_helpers/models/PTLSitioAP.model';
import { PTLSitiosAPService } from 'src/app/theme/shared/service/ptlsitios-ap.service';
import { data } from '../../../fack-db/series-data';

@Component({
  selector: 'app-sites',
  standalone: true,
  imports: [DataTablesModule],
  templateUrl: './sites.component.html',
  styleUrl: './sites.component.scss'
})
export class SitesComponent implements OnInit, AfterViewInit {
    [x: string]: any;

dtColumnSearchingOptions: object = {};
  @ViewChild(DataTableDirective)
  datatableElement!: DataTableDirective;

  sitiosAP: PTLSitiosAP[]=[];

  constructor(private router: Router, private sitiosService:PTLSitiosAPService) {}
  // life cycle event
  ngOnInit() {
    this.consultarSitios();
    this.dtColumnSearchingOptions = {
      ajax: 'fake-data/datatable-data.json',
      columns: [
        {
          title: 'Nombre',
          data: 'nombre'
        },
        {
          title: 'Descripción',
          data: 'descripción'
        },
        {
          title: 'URL',
          data: 'URL'
        },
        {
          title: 'Estado',
          data: 'estado'
        }
      ],
      responsive: true
    };
  }
  consultarSitios () {
this.sitiosService.getSitios().subscribe((sitios:any) => {
    console.log('Todos los sitios', sitios.resp.data);
    this.sitiosAP = sitios.resp.data;
});
  }

  ngAfterViewInit(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.columns().every(function () {
        // eslint-disable-next-line
        const input = $('input', this.footer()) as any;
        input.on('keyup change', () => {
          if (this.search() !== input.val()) {
            this.search(input.val()).draw();
          }
        });
      });
    });
  }

  nuevoSitio() {
    this.router.navigate(['/sites/new-site']);
  }
}
