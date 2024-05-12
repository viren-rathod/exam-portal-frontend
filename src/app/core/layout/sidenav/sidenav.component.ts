import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/services/auth/login.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  navData = NAVBAR_DATA;
  collapsed = true;
  screenWidth = 0;
  loginUserName: string | undefined;

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
  }
  closeSidenav(): void {
    this.collapsed = false;
  }

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    let loginData = this.loginService.getUserDetailsFromLocalStorage();
    this.loginUserName = loginData?.username;
  }

  onLogout() {
    if (confirm('Are u sure ?')) this.loginService.removeTokenFromStorage();
  }
}

const NAVBAR_DATA = [
  {
    routerLink: '/exam-portal/dashboard',
    img: '../../../../assets/images/home.svg',
    label: 'Dashboard',
    role: ['ADMIN', 'USER']
  },
  {
    routerLink: '/exam-portal/admin/exam',
    img: '../../../../assets/images/book.svg',
    label: 'Exam',
    role: ['ADMIN']
  },
  {
    routerLink: '/exam-portal/admin/category',
    img: '../../../../assets/images/category.svg',
    label: 'Category',
    role: ['ADMIN']
  },
  {
    routerLink: '/exam-portal/admin/questions',
    img: '../../../../assets/images/question.svg',
    label: 'Questions',
    role: ['ADMIN']
  },
];
