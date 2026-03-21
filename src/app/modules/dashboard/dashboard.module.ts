import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {NgxPermissionsModule} from "ngx-permissions";
import {DashboardComponent} from "./dashboard.component";
import {CandidateFormComponent} from "./candidate-form/candidate-form.component";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [DashboardComponent, CandidateFormComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxPermissionsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class DashboardModule {
}
