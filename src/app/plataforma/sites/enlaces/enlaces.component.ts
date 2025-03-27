import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-enlaces',
  standalone: true,
  imports: [DataTablesModule],
  templateUrl: './enlaces.component.html',
  styleUrls: ['./enlaces.component.css']
})
export class EnlacesComponent implements OnInit, AfterViewInit  {
    [x: string]: any;
dtColumnSearchingOptions: object = {};
  @ViewChild(DataTableDirective)
  datatableElement!: DataTableDirective;

  constructor(private router: Router) {}

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
          title: 'Ruta',
          data: 'Ruta'
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

  nuevoEnlace() {
    this.router.navigate(['/sites/new-enlace']);
  }
}