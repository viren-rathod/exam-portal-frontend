import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminExamComponent } from './admin-exam.component';
import { AddEditExamComponent } from './add-edit-exam/add-edit-exam.component';
import { ExamCandidatesComponent } from './exam-candidates/exam-candidates.component';

const routes: Routes = [
  { path: '', component: AdminExamComponent },
  { path: 'add', component: AddEditExamComponent },
  { path: 'edit/:id', component: AddEditExamComponent },
  { path: ':id/candidates', component: ExamCandidatesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminExamRoutingModule {}
