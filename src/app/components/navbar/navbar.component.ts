import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  ngOnInit(): void {}

  constructor(private loginService: LoginService) {}

  onLogout() {
    if (confirm('Are you sure ?')) this.loginService.removeTokenFromStorage();
  }
}
