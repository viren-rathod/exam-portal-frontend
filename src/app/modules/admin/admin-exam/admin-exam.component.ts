import { Component, OnInit } from '@angular/core';
import { Status } from 'src/app/shared/enums/status.enum';
import {
  ExamDataRequest,
  ExamList,
} from 'src/app/shared/models/api/exam.model';
import { ExamService } from 'src/app/shared/services/exam/exam.service';

@Component({
  selector: 'app-admin-exam',
  templateUrl: './admin-exam.component.html',
  styleUrls: ['./admin-exam.component.css'],
})
export class AdminExamComponent implements OnInit {
  examData: Array<ExamList> = [];
  StatusType = Status;
  getExamData: ExamDataRequest = {
    page: 0,
    size: 10,
    sortField: 'id',
    sortOrder: 'asc',
    searchData: '',
  };

  constructor(private examService: ExamService) { }

  ngOnInit(): void {
    this.getExam(this.getExamData);
  }

  /**
   * Get Exam Details
   * @param data
   */
  getExam(data: ExamDataRequest) {
    this.examService.getExams(data).subscribe({
      next: (res) => {
        this.examData = res.data.content;
        console.log('getAllExams-->', this.examData);
      },
      error: (error) => console.log(error.error.message),
    });
  }

  /**
   * @param id
   * Start Inactive Exam
   */
  onStart(id: number): void {
    if (confirm("are u sure")) {
      this.examService.startExam(id).subscribe({
        next: () => {
          this.getExam(this.getExamData);
        },
        error: (error) => console.log(error.error.message),
      })
    }
  }

  /**
   * Stop Active Exam
   * @param id
   */
  onStop(id: number) {
    if (confirm("are u sure")) {
      this.examService.stopExam(id).subscribe({
        next: () => {
          this.getExam(this.getExamData);
        },
        error: (error) => console.log(error.error.message),
      })
    }
  }

  /**
   * Delete Exam
   * @param id
   */
  onDelete(id: number) {
    if (confirm('Are you sure')) {
      this.examService.deleteExam(id).subscribe({
        next: (res) => {
          console.log(res);
          this.getExam(this.getExamData);
        },
        error: (err) => console.log(err.error.message),
      });
    }
  }
}
