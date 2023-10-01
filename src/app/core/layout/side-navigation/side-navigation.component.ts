import { Component } from '@angular/core';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.css'],
})
export class SideNavigationComponent {
  isSidebarClosed = false;

  toggleSideBar() {
    this.isSidebarClosed = !this.isSidebarClosed;
  }
}
