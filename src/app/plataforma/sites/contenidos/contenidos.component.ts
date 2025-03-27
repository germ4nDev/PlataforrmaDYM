import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTablesModule, DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-contenidos',
  standalone: true,
  imports: [DataTablesModule],
  templateUrl: './contenidos.component.html',
  styleUrls: ['./contenidos.component.css']
})
export class ContenidosComponent implements OnInit, AfterViewInit {
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
          title: 'Contenido',
          data: 'Contenido'
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

  nuevoContenido() {
    this.router.navigate(['/sites/new-contenido']);
  }
}

