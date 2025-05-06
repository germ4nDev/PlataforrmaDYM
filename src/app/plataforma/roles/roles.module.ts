import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { BreadcrumbComponent } from 'src/app/theme/shared/components/breadcrumb/breadcrumb.component';

@NgModule({
  imports: [
    CommonModule, RolesRoutingModule, SharedModule
  ],
    declarations: [],
    providers: [BreadcrumbComponent]
})
export class RolesModule { }
