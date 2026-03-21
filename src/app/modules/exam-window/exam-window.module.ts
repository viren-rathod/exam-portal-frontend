import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamWindowRoutingModule } from './exam-window-routing.module';
import { ExamWindowComponent } from './exam-window.component';

@NgModule({
  declarations: [ExamWindowComponent],
  imports: [
    CommonModule,
    ExamWindowRoutingModule
  ]
})
export class ExamWindowModule {}
