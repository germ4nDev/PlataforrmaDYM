import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LicenciasRoutingModule } from './licencias-routing.module';
import { BreadcrumbComponent } from 'src/app/theme/shared/components/breadcrumb/breadcrumb.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@NgModule({
  imports: [
    CommonModule, LicenciasRoutingModule, SharedModule
  ],
  declarations: [],
    providers: [BreadcrumbComponent]
})
export class LicenciasModule { }
