import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-conexciones',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './conexiones.component.html',
  styleUrl: './conexiones.component.scss'
})
export class ConexionesComponent {

}
