import { Component, HostListener, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  navData = NAVBAR_DATA;
  collapsed = true;
  screenWidth = 0;
  loginUserName:string|undefined;

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
  }
  closeSidenav(): void {
    this.collapsed = false;
  }

  constructor(private loginService: LoginService){}

  ngOnInit(): void {
    let loginData = this.loginService.getUserDetailsFromLocalStorage();
    this.loginUserName = loginData?.username;
  }

  onLogout() {
    if(confirm("Are u sure ?"))
      this.loginService.removeTokenFromStorage();
  }

}

const NAVBAR_DATA = [
  {
    routerLink: '/exam-portal/dashboard',
    icon: 'bi bi-house',
    label: 'Dashhboard'
  },
  {
    routerLink: '/exam-portal/admin/exam',
    icon: 'bi bi-book',
    label: 'Exam'
  },
  {
    routerLink: '/exam-portal/admin/category',
    icon: 'bi bi-list',
    label: 'Category'
  },

]