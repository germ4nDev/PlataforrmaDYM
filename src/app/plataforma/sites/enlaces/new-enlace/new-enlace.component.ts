
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

// third party
import { NarikCustomValidatorsModule } from '@narik/custom-validators';
import { Router } from '@angular/router';

export class FormEnlace {
  nombre!: string;
  descripcion!: string;
  ruta!: string;
  estado!: string;
}

@Component({
  selector: 'app-new-enlace',
  standalone: true,
  imports: [CommonModule, SharedModule, NarikCustomValidatorsModule],
  templateUrl: './new-enlace.component.html',
  styleUrl: './new-enlace.component.scss'
})
export class NewEnlaceComponent implements OnInit {

  // private props
  FormEnlace!: FormEnlace;
  form: undefined;
  isSubmit: boolean;

  // constructor
  constructor(private router: Router) {
    this.isSubmit = false;
  }

  // life cycle event
  ngOnInit() {
    this.FormEnlace = {
      nombre: '',
      descripcion: '',
      ruta: '',
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
