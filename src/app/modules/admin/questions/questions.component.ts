import { Component, OnInit } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import {
  Question,
  QuestionDataRequest,
  QuestionList,
} from 'src/app/shared/models/api/question.model';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { QuestionService } from 'src/app/shared/services/question/question.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnInit {
  questionList: QuestionList[] = [];
  totalQuestions: number = 0;
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 3;
  sizeArray = [
    {
      value: 3,
      title: 3,
    },
    {
      value: 5,
      title: 5,
    },
    {
      value: 10,
      title: 10,
    },
  ];
  getQuestionData: QuestionDataRequest = {
    page: this.currentPage,
    size: this.pageSize,
    sortField: 'id',
    sortOrder: 'asc',
    searchData: '',
  };
  categories: String[] = [];
  private searchSubject = new Subject<string>();

  constructor(
    private questionService: QuestionService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.searchSubject
      .pipe(debounceTime(700), distinctUntilChanged())
      .subscribe((res) => this.searchHandler(res));
    this.getQuestions(this.getQuestionData);
    this.getCategories();
  }

  getQuestions(data: QuestionDataRequest) {
    this.questionService.getQuestions(data).subscribe({
      next: (res) => {
        if (res) {
          this.questionList = [];
          res.data.content.map(item => {
            let question: QuestionList = {
              id: item.t.id || 0,
              title: item.t.title,
              description: item.t.description,
              categoryId: item.t.categoryId,
            }
            this.questionList.push(question);
          });
          this.totalPages = res.data.totalPages;
          this.currentPage = res.data.number;
          this.totalQuestions = res.data.totalElements;
        } else {
          this.questionList = [];
          this.totalPages = 0;
        }
        console.log('getQuestionData() -->', this.questionList);
      },
      error: (error) => console.log(error.error.message),
    });
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        if (res) {
          res.data.map((item) => {
            this.categories[item.id] = item.title;
          });
        }
      },
      error: (error) => console.log(error.error.message),
    });
  }

  /**
   * Delete Exam
   * @param id
   */
  onDelete(id: number) {
    if (confirm('Are you sure')) {
      this.questionService.deleteQuestion(id).subscribe({
        next: (res) => {
          console.log(res);
          this.getQuestions(this.getQuestionData);
        },
        error: (err) => console.log(err.error.message),
      });
    }
  }

  onParamsChange(index: number): void {
    this.getQuestionData = { ...this.getQuestionData, page: index };
    this.getQuestions(this.getQuestionData);
  }

  handleSizeChange(event: Event) {
    this.getQuestionData = {
      ...this.getQuestionData,
      size: +(event.target as HTMLInputElement).value,
    };
    this.getQuestions(this.getQuestionData);
  }

  /**
   * Handling Search with debounce
   * @param event
   */
  onSearch(event: Event) {
    let saerchString = (event.target as HTMLInputElement).value;
    this.searchSubject.next(saerchString);
  }

  /**
   * Performing search
   * @param str
   */
  searchHandler(str: string) {
    this.getQuestionData = {
      ...this.getQuestionData,
      searchData: str,
    };
    this.getQuestions(this.getQuestionData);
  }
}
