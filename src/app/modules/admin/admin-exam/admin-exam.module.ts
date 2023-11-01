import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminExamRoutingModule } from './admin-exam-routing.module';
import { AdminExamComponent } from './admin-exam.component';
import { AddEditExamComponent } from './add-edit-exam/add-edit-exam.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminExamComponent, AddEditExamComponent],
  imports: [
    CommonModule,
    AdminExamRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AdminExamModule {}
