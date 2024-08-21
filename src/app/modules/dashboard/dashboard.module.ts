import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {NgxPermissionsModule} from "ngx-permissions";
import {DashboardComponent} from "./dashboard.component";


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxPermissionsModule
  ]
})
export class DashboardModule {
}
