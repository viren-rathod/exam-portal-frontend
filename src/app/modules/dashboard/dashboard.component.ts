import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from "../../shared/services/auth/login.service";
import {NgxPermissionsService} from "ngx-permissions";
import {DashboardService} from "../../shared/services/dashboard/dashboard.service";
import {ActiveExam, GetActiveExamsRequest} from "../../shared/models/api/exam.model";
import {Status} from "../../shared/enums/status.enum";
import {Roles} from "../../shared/enums/roles.enum";
import {debounceTime, distinctUntilChanged, Subject} from "rxjs";
import {CandidateFormComponent} from "./candidate-form/candidate-form.component";
import {StudentExamService} from "../../shared/services/student-exam/student-exam.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('candidateForm') candidateForm?: CandidateFormComponent;

  count: number | null = null;
  isCandidateActive: boolean = false;
  listOfData: ActiveExam[] = [];
  message: string = '';
  status: string[] = [];
  role = '';
  total = 0;
  getActiveExamsData: GetActiveExamsRequest = {
    page: 0,
    perPage: 3,
    sortField: '',
    sortOrder: '',
    searchData: '',
    status: Status.Active
  };
  sort: number = 1;
  StatusType = Status;
  isVisible = false;
  private searchSubject = new Subject<string>();

  constructor(
    private loginService: LoginService,
    private permissionService: NgxPermissionsService,
    private router: Router,
    private dashboardService: DashboardService,
    private studentExamService: StudentExamService,
  ) {
  }

  //Listener for updating data on every focus
  @HostListener("window:focus", ["$event"]) focusChange() {
    if (Roles.User === this.role) {
      const user = this.loginService.getUserDetailsFromLocalStorage();
      this.getActiveExamsData.page = 0;
      this.getActiveExamsData.id = user?.id;
      
      this.getActiveExams(this.getActiveExamsData);
    }
  }

  ngOnInit(): void {
    this.role = this.loginService.getUserRole()!;    
    this.permissionService.loadPermissions([this.role]);
    this.searchSubject
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((res) => this.searchHandler(res));
      this.getActiveExams(this.getActiveExamsData);
  }

  getActiveExams(data: GetActiveExamsRequest): void {
    const user = this.loginService.getUserDetailsFromLocalStorage();
    data.id = user?.id;

    let lastPage = Math.ceil(this.total / this.getActiveExamsData.perPage);
    if (lastPage < this.getActiveExamsData.page) {
      this.getActiveExamsData.page = lastPage;
    }
    this.status = [];
    this.dashboardService.getActiveExams(data)
      .subscribe({
        next: (res) => {
          this.total = res.data.totalElements;
          this.listOfData = res.data.content ?? [];
          if (this.listOfData.length > 0 && this.role === Roles.User) {
            this.listOfData.every(exam => {
              this.isCandidateActive = exam.candidateStatus == Status.Active;
              return !this.isCandidateActive;
            })
            this.listOfData.forEach(item => this.status.push(item.candidateStatus || 'NO_CANDIDATE'));
          }
        },
        error: (error) => console.log(error.error.message),
      })
  }

  searchHandler(str: string) {
    
    this.getActiveExamsData = {
      ...this.getActiveExamsData,
      page: 0,
      searchData: str,
    };
    this.getActiveExams(this.getActiveExamsData);
  }

  redirectToUrl(url: string) {
    this.router.navigate([url]);
  }

  onSearch(event: Event) {
    let saerchString = (event.target as HTMLInputElement).value;
    this.searchSubject.next(saerchString);
  }

  /**
   * Handling Sorting on Each field
   * @param event
   */
  handleSort(event: Event) {
  }

  // ===== USER ACTIONS =====

  /**
   * When USER clicks "Start" on an exam with NOT_ATTENDED status
   * Opens candidate registration form
   */
  onStartExam(exam: ActiveExam, needsForm: boolean = true): void {
    if (needsForm) {
      if (this.candidateForm) {
        this.candidateForm.open(exam.id);
      }
    } else {
      // Candidate exists, but exam not started
      this.studentExamService.startExam(exam.id).subscribe({
        next: () => {
          this.openExamWindow(exam.id);
          this.getActiveExams(this.getActiveExamsData);
        },
        error: (err) => {
          console.error('Failed to start exam:', err);
          this.openExamWindow(exam.id);
        }
      });
    }
  }

  /**
   * Called after candidate form is successfully submitted
   * Starts the exam and opens the popup window
   */
  onCandidateFormSubmitted(examId: number): void {
    this.studentExamService.startExam(examId).subscribe({
      next: () => {
        this.openExamWindow(examId);
        this.getActiveExams(this.getActiveExamsData);
      },
      error: (err) => {
        console.error('Failed to start exam:', err);
        // Still try to open the window — the exam might have already started
        this.openExamWindow(examId);
      }
    });
  }

  /**
   * When USER clicks "Continue" on an exam with ATTENDING status
   * Re-opens the exam popup window (resumes from where they left)
   */
  onContinueExam(exam: ActiveExam): void {
    this.openExamWindow(exam.id);
  }

  /**
   * Opens the exam in a secure popup window
   */
  openExamWindow(examId: number): void {
    const width = Math.min(screen.width, 1200);
    const height = Math.min(screen.height, 800);
    const left = (screen.width - width) / 2;
    const top = (screen.height - height) / 2;

    const features = [
      `width=${width}`,
      `height=${height}`,
      `left=${left}`,
      `top=${top}`,
      'menubar=no',
      'toolbar=no',
      'location=no',
      'status=no',
      'scrollbars=yes',
      'resizable=yes'
    ].join(',');

    window.open(`/exam-portal/exam/${examId}`, `exam_${examId}`, features);
  }

  // ===== ADMIN ACTIONS =====

  /**
   * When ADMIN clicks "View Candidates" — navigates to exam detail
   */
  viewCandidates(examId: number): void {
    this.router.navigate(['/exam-portal/admin/exam', examId, 'candidates']);
  }
}
