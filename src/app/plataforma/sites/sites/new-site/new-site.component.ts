
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

// third party
import { NarikCustomValidatorsModule } from '@narik/custom-validators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

export class FormSitio {
  nombre!: string;
  descripcion!: string;
  url!: string;
  estado!: string;
  puertoSitio!: string;
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
  constructor(private router: Router) {
    this.isSubmit = false;
  }

  // life cycle event
  ngOnInit() {
    this.FormSitio = {
      nombre: '',
      descripcion: '',
      url: '',
      estado: '',
      puertoSitio: '',
    };
  }

  save(form: { valid: undefined }) {
    if (!form.valid) {
      this.isSubmit = true;
      return;
    }
  }

  confirmAlert() {
    Swal.fire('', 'el Sitio se insertó correctamente', 'success');
  }

  insertarSitio() {
    this.router.navigate(['/sites/new-site']);
  }
  regresarSitio() {
    this.router.navigate(['/sites/sites']);
  }
}

