import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataTablesModule, DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-suscriptores',
  standalone: true,
  imports: [DataTablesModule],
  templateUrl: './suscriptores.component.html',
  styleUrl: './suscriptores.component.scss'
})
export class SuscriptoresComponent implements OnInit, AfterViewInit{
dtColumnSearchingOptions: object = {};
  @ViewChild(DataTableDirective)
  datatableElement!: DataTableDirective;

  // life cycle event
  ngOnInit() {
    this.dtColumnSearchingOptions = {
      ajax: 'fake-data/datatable-data.json',
      columns: [
        {
          title: 'Name',
          data: 'name'
        },
        {
          title: 'Position',
          data: 'position'
        },
        {
          title: 'Office',
          data: 'office'
        },
        {
          title: 'Age',
          data: 'age'
        },
        {
          title: 'Start Date',
          data: 'date'
        },
        {
          title: 'Salary',
          data: 'salary'
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
}
