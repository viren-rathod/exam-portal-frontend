import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionsComponent } from './questions.component';
import { AddEditQuestionComponent } from './add-edit-question/add-edit-question.component';

const routes: Routes = [
  { path: '', component: QuestionsComponent },
  { path: 'add', component: AddEditQuestionComponent },
  { path: 'edit/:id', component: AddEditQuestionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionsRoutingModule {}
