// src/app/login-success/login-success.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Roles } from 'src/app/shared/enums/roles.enum';
import { CurrentUser } from 'src/app/shared/models/auth.model';
import { LoginService } from 'src/app/shared/services/auth/login.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

@Component({
  selector: 'app-login-success',
  template: ` <p>Logging in...</p> `,
  styles: [],
})
export class LoginSuccessComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: LoginService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const token = params['token'];
      if (token) {
        this.authService.setToken(token);
        this.authService.getCurrentUser().subscribe({
          next: (user: CurrentUser) => {
            this.authService.setUserDetailsLocalStorage(user.data);
            if (this.authService.getUserRole() === Roles.User) {
              this.router.navigate(['/exam-portal/dashboard']);
            } else if (this.authService.getUserRole() === Roles.Admin) {
              this.router.navigate(['register']);
            }
          },
          error: (error) => {
            this.toast.openError(error.error.message);
          },
        });
      } else {
        const error = params['error'];
        console.error('OAuth2 login failed:', error);
        this.router.navigate(['/login'], {
          queryParams: { error: 'oauth2_login_failed' },
        });
      }
    });
  }
}
