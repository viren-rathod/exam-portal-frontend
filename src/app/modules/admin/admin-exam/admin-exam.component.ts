import { Component, OnInit } from '@angular/core';
import { Exam, ExamDataRequest } from 'src/app/shared/models/api/exam.model';
import { ExamService } from 'src/app/shared/services/exam/exam.service';

@Component({
  selector: 'app-admin-exam',
  templateUrl: './admin-exam.component.html',
  styleUrls: ['./admin-exam.component.css'],
})
export class AdminExamComponent implements OnInit {
  examData: Array<Exam> = [];
  getExamData: ExamDataRequest = {
    page: 1,
    size: 10,
  };

  constructor(private examService: ExamService) {}
  ngOnInit(): void {
    this.getExam(this.getExamData);
  }

  /**
   * Get Exam Details
   */
  getExam(data: ExamDataRequest) {
    this.examService.getExams(data).subscribe({
      next: (res) => {
        this.examData = res.data;
        console.log('getAllExams-->', this.examData);
      },
      error: (error) => console.log(error.error.message),
    });
  }
}
