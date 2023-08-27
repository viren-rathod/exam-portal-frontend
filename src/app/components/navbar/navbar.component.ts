import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { navbarData } from './nav-data';

export interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.scrrenWidth = window.innerWidth;
    if (this.scrrenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({
        collapsed: this.collapsed,
        screenWidth: this.scrrenWidth,
      });
    }
  }
  ngOnInit(): void {
    this.scrrenWidth = window.innerWidth;
  }

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();

  collapsed = true;
  scrrenWidth = 0;
  navData = navbarData;

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.scrrenWidth,
    });
  }

  // cloeSidenav(): void {
  //   this.collapsed = false;
  //   this.onToggleSideNav.emit({
  //     collapsed: this.collapsed,
  //     screenWidth: this.scrrenWidth,
  //   });
  // }
}
