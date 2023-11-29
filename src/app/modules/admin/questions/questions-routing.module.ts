import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionsComponent } from './questions.component';
import { AddEditQuestionComponent } from './add-edit-question/add-edit-question.component';
import { ViewQuestionComponent } from './view-question/view-question.component';

const routes: Routes = [
  { path: '', component: QuestionsComponent },
  { path: 'add', component: AddEditQuestionComponent },
  { path: 'edit/:id', component: AddEditQuestionComponent },
  { path: 'view/:id', component: ViewQuestionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionsRoutingModule { }
