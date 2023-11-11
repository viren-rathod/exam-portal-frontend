import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {

  navData = NAVBAR_DATA;
  collapsed = true;
  screenWidth = 0;

  // @HostListener('window:resize', ['$event'])
  // onResize(event: any) {
  //   this.screenWidth = window.innerWidth;
  //   if (this.screenWidth <= 768) this.collapsed = false;
  //   else this.collapsed = true;
  // }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
  }
  closeSidenav(): void {
    this.collapsed = false;
  }

  onToggleSidenav(event: Event) {
    console.log('Sidenav toggled:', event);
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