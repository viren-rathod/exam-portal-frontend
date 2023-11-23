import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionsComponent } from './questions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEditQuestionComponent } from './add-edit-question/add-edit-question.component';

@NgModule({
  declarations: [QuestionsComponent, AddEditQuestionComponent],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class QuestionsModule {}
