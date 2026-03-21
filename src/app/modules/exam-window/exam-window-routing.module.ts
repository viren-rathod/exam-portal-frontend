import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamWindowComponent } from './exam-window.component';

const routes: Routes = [
  {
    path: '',
    component: ExamWindowComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamWindowRoutingModule {}
