
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

// third party
import { NarikCustomValidatorsModule } from '@narik/custom-validators';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PTLSitiosAPService } from 'src/app/theme/shared/service/ptlsitios-ap.service';

export class FormSitio {
  sitioId!: number;
  aplicacionId!: number;
  nombreSitio!: string;
  descripcionSitio!: string;
  urlSitio!: string;
  estadoSitio!: boolean;
  puertoSitio!: number;
}

@Component({
    selector: 'app-new-site',
    standalone: true,
    imports: [CommonModule, SharedModule, NarikCustomValidatorsModule],
    templateUrl: './new-site.component.html',
    styleUrl: './new-site.component.scss'
  })
export class NewSiteComponent implements OnInit {
  // private props
  FormSitio!: FormSitio;
  form: undefined;
  isSubmit: boolean;

  // constructor
  constructor(private router: Router,
     private sitiosService:PTLSitiosAPService,
     private route: ActivatedRoute,) {
    this.isSubmit = false;
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const id = params['sitioId'];
      console.log('me llena el Id', id);

      if (id) {
        this.sitiosService.getSitioById(+id).subscribe({
          next: (resp: any) => {
            this.FormSitio = resp.data;
          },
          error: () => {
            Swal.fire('Error', 'No se pudo obtener el sitio', 'error');
          }
        });
      }
      else {
        this.FormSitio = {
          sitioId: 0,
          aplicacionId: 0,
          nombreSitio: '',
          descripcionSitio: '',
          urlSitio: '',
          puertoSitio: 0,
          estadoSitio: true
        };
      }
    });
  }

  btnInsertarSitios(form: any) {
    this.isSubmit = true;

    if (!form.valid) {
      return;
    }

    this.sitiosService.insertarSitio(this.FormSitio).subscribe({
      next: (resp:any) => {
        if (resp.ok) {
          Swal.fire('', 'El sitio se insertó correctamente', 'success');
          form.resetForm();
          this.isSubmit = false;
          this.router.navigate(['/sites/sites']);
        }
      },
      error: (err:any) => {
        console.error(err);
        Swal.fire('Error', 'No se pudo insertar el sitio', 'error');
      }
    });
  }

  btnRegresarSitio() {
    this.router.navigate(['/sites/sites']);
  }
}

