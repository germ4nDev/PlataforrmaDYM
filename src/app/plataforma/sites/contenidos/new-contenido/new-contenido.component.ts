import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

// third party
import { NarikCustomValidatorsModule } from '@narik/custom-validators';
import { Router } from '@angular/router';

export class FormContenido {
  nombre!: string;
  descripcion!: string;
  contenido!: string;
  estado!: string;
}

@Component({
  selector: 'app-new-contenido',
  standalone: true,
  imports: [CommonModule, SharedModule, NarikCustomValidatorsModule],
  templateUrl: './new-contenido.component.html',
  styleUrl: './new-contenido.component.scss'
})
export class NewContenidoComponent implements OnInit {
 // private props
  FormContenido!: FormContenido;
  form: undefined;
  isSubmit: boolean;

  // constructor
  constructor(private router: Router) {
    this.isSubmit = false;
  }

  // life cycle event
  ngOnInit() {
    this.FormContenido = {
      nombre: '',
      descripcion: '',
      contenido: '',
      estado: '',
    };
  }

  save(form: { valid: undefined }) {
    if (!form.valid) {
      this.isSubmit = true;
      return;
    }
  }

  insertarSitio() {
    this.router.navigate(['/sites/new-site']);
  }
  regresarSitio() {
    this.router.navigate(['/sites/sites']);
  }
}
