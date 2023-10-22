import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminExamComponent } from './admin-exam.component';

const routes: Routes = [
  {
    path: '',
    component: AdminExamComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminExamRoutingModule { }
