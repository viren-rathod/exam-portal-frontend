import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from "../../shared/services/auth/login.service";
import {NgxPermissionsService} from "ngx-permissions";
import {DashboardService} from "../../shared/services/dashboard/dashboard.service";
import {ActiveExam, GetActiveExamsRequest} from "../../shared/models/api/exam.model";
import {Status} from "../../shared/enums/status.enum";
import {Roles} from "../../shared/enums/roles.enum";
import {debounceTime, distinctUntilChanged, Subject} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
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
    // this.storage.store('status', true);
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
            this.listOfData.forEach(item => this.status.push(item.candidateStatus));
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
    // let sortField: string = 'id';
    // let sortOrder: string = 'asc';
    // if (this.sort > 2) {
    //   this.sort = 1;
    //   sortField = 'id';
    //   sortOrder = 'asc';
    // } else {
    //   this.sort += 1;
    //   sortField = (event.currentTarget as HTMLInputElement).id;
    //   sortOrder = this.sort == 2 ? 'dsc' : 'asc';
    // }

    // this.getExamData = {
    //   ...this.getExamData,
    //   sortField: sortField,
    //   sortOrder: sortOrder
    // };
    // this.getExam(this.getExamData);
  }
}
