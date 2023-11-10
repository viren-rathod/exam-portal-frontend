import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminExamComponent } from './admin-exam.component';
import { AddEditExamComponent } from './add-edit-exam/add-edit-exam.component';

const routes: Routes = [
  { path: '', component: AdminExamComponent },
  { path: 'add', component: AddEditExamComponent },
  { path: 'edit/:id', component: AddEditExamComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminExamRoutingModule {}
