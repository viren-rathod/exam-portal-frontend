import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Option, QuestionAndOptions } from 'src/app/shared/models/api/option.model';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { QuestionService } from 'src/app/shared/services/question/question.service';

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.css']
})
export class ViewQuestionComponent implements OnInit {

  id: number = 0;
  categoryId: number = 0;
  answerId: number | undefined = undefined;
  viewQuestionAndOptions: QuestionAndOptions = {
    options: [],
    answer: '',
    question: '',
    description: '',
    category: '',
    created_at: '',
    created_by: ''
  }
  options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  constructor(
    private questionsService: QuestionService,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) { }
  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        if (params['id'] != null) {
          this.id = params['id'];
        }
      }
    )
    this.getQuestions();
  }

  getQuestions(): void {
    this.questionsService.getQuestionById(this.id).subscribe({
      next: (res) => {
        const questionData = res.data.t;
        this.viewQuestionAndOptions.options = res.data.k;
        this.viewQuestionAndOptions.question = questionData.title;
        this.viewQuestionAndOptions.description = questionData.description;
        this.viewQuestionAndOptions.created_by = questionData.created_by;
        this.categoryId = questionData.categoryId;
        const dateString = questionData.created_at;
        const dateTime = new Date(dateString!);
        this.viewQuestionAndOptions.created_at = new Intl.DateTimeFormat("en-GB", this.options).format(dateTime);

        this.questionsService.getAnswerByQuestionId(this.id).subscribe({
          next: (res) => {
            this.viewQuestionAndOptions.answer = res.data.title;
            this.answerId = res.data.id;
          },
          error: (error) => console.log(error.error.message)
        });

        this.categoryService.getCategoryById(this.categoryId).subscribe({
          next: (res) => this.viewQuestionAndOptions.category = res.data.title
        });
      },
      error: (error) => console.log(error.error.message)
    });
  }

}
