// Angular Import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
        {
            path: 'inicio',
            loadComponent: () => import('./inicio/inicio.component').then(m => m.InicioComponent)
        },
        {
            path: 'gestion-inicio',
            loadComponent: () => import('./inicio/gestion-inicio/gestion-inicio.component').then(m => m.GestionInicioComponent)
        },
        {
            path: 'login',
            loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
        },
        {
            path: 'gestion-login',
            loadComponent: () => import('./login/gestion-login/gestion-login.component').then(m => m.GestionLoginComponent)
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontalRoutingModule {}
