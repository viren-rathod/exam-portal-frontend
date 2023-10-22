import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminExamRoutingModule } from './admin-exam-routing.module';
import { AdminExamComponent } from './admin-exam.component';


@NgModule({
  declarations: [
  
    AdminExamComponent
  ],
  imports: [
    CommonModule,
    AdminExamRoutingModule
  ]
})
export class AdminExamModule { }
