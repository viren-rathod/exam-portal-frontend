import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule,
    NgxPermissionsModule.forRoot(),],
})
export class SharedModule {}
