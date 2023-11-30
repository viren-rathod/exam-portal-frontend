import { Component, OnInit } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
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
  totalExams: number = 0;
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
  StatusType = Status;
  getExamData: ExamDataRequest = {
    page: this.currentPage,
    size: this.pageSize,
    sortField: 'id',
    sortOrder: 'asc',
    searchData: '',
  };
  sort: number = 1;
  private searchSubject = new Subject<string>();

  constructor(private examService: ExamService) { }

  ngOnInit(): void {
    this.searchSubject
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((res) => this.searchHandler(res));
    this.getExam(this.getExamData);
  }

  /**
   * Get Exam Details
   * @param data
   */
  getExam(data: ExamDataRequest) {
    this.examService.getExams(data).subscribe({
      next: (res) => {
        if (res) {
          this.examData = res.data.content;
          this.totalExams = res.data.totalElements;
          this.totalPages = res.data.totalPages;
          this.currentPage = res.data.number;
        } else {
          this.getExam({
            page: 0,
            size: this.pageSize,
            sortField: 'id',
            sortOrder: 'asc',
            searchData: '',
          });
        }
      },
      error: (error) => console.log(error.error.message),
    });
  }

  /**
   * @param id
   * Start Inactive Exam
   */
  onStart(id: number): void {
    if (confirm('are u sure')) {
      this.examService.startExam(id).subscribe({
        next: () => {
          this.getExam(this.getExamData);
        },
        error: (error) => console.log(error.error.message),
      });
    }
  }

  /**
   * Stop Active Exam
   * @param id
   */
  onStop(id: number) {
    if (confirm('are u sure')) {
      this.examService.stopExam(id).subscribe({
        next: () => {
          this.getExam(this.getExamData);
        },
        error: (error) => console.log(error.error.message),
      });
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

  /**
   * Handling Pagination
   * @param index
   */
  onParamsChange(index: number): void {
    this.getExamData = { ...this.getExamData, page: index };
    this.getExam(this.getExamData);
  }
  /**
   * Handling Sorting on Each field
   * @param event 
   */
  handleSort(event: Event) {
    let sortField: string = 'id';
    let sortOrder: string = 'asc';
    if (this.sort > 2) {
      this.sort = 1;
      sortField = 'id';
      sortOrder = 'asc';
    }
    else {
      this.sort += 1;
      sortField = (event.currentTarget as HTMLInputElement).id;
      sortOrder = this.sort == 2 ? 'dsc' : 'asc';
    };

    this.getExamData = {
      ...this.getExamData,
      sortField: sortField,
      sortOrder: sortOrder
    };
    this.getExam(this.getExamData);
  }

  /**
   * Handling Items per page
   * @param event
   */
  handleSizeChange(event: Event) {
    this.getExamData = {
      ...this.getExamData,
      size: +(event.target as HTMLInputElement).value,
      page: 0,
    };
    this.getExam(this.getExamData);
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
    this.getExamData = {
      ...this.getExamData,
      page: 0,
      searchData: str,
    };
    this.getExam(this.getExamData);
  }
}
