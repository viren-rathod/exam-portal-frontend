import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category/category.service';
import { Category } from '../../models/api/category.model';
import { ExamService } from '../../services/exam/exam.service';
import { QuestionService } from '../../services/question/question.service';
import { Exam } from '../../models/api/exam.model';
import { Question, QuestionList } from '../../models/api/question.model';
import { CandidateService } from '../../services/candidate/candidate.service';
import { Candidate } from '../../models/api/candidate.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  examData: Array<Exam> = [];
  categoryData: Array<Category> = [];
  questionData: Array<Question> = [];
  candidateData: Array<Candidate> = [];

  constructor(
    private categoryService: CategoryService,
    private examService: ExamService,
    private questionService: QuestionService,
    private candidateService: CandidateService,
    private router: Router
  ) { }
  ngOnInit(): void {
    /**
     * Get Category details
     */
    this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.categoryData = res.data;
        console.log('getAllCategories-->', this.categoryData);
      },
      error: (error) => {
        console.log('ERROR-->', error);
      },
    });

    /**
     * Get Exam Details
     */
    this.examService.getAllExams().subscribe({
      next: (res) => {
        this.examData = res.data;
        console.log('getAllExams-->', this.examData);
      },
      error: (error) => console.log(error.error.message),
    });

    /**
     * Get Questions details
     */
    this.questionService.getAllQuestions().subscribe({
      next: (res) => {
        // this.questionData = res.data;
        res.data.map(item => {
          let question: QuestionList = {
            id: item.t.id || 0,
            title: item.t.title,
            description: item.t.description,
            categoryId: item.t.categoryId,
          }
          this.questionData.push(question);
        });
        console.log('getAllQuestions-->', this.questionData);
      },
      error: (error) => console.log(error.error),
    });

    /**
     * Get Candidate Details
     */
    this.candidateService.getAllCandidates().subscribe({
      next: (res) => {
        this.candidateData = res?.data;
        console.log('getAllCandidates-->', this.candidateData);
      },
      error: (error) => console.log(error.error),
    });
  }

  redirectToUrl(url: string) {
    this.router.navigate([url]);
  }
}
