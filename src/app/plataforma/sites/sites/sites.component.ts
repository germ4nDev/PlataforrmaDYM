import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Router} from '@angular/router';

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

  constructor(private router: Router) {}
  // life cycle event
  ngOnInit() {
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
