import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Roles} from 'src/app/shared/enums/roles.enum';
import {CurrentUser, UserLoginRequest} from 'src/app/shared/models/auth.model';
import {LoginService} from 'src/app/shared/services/auth/login.service';
import {ToastService} from "../../shared/services/toast/toast.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  styles: [
    `
      :host {
        font-size: 16px;
        line-height: 1.5;
        --primary-blue: #233975;
      }
    `,
  ],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  ngOnInit(): void {
    if (this.loginService.getTokenFromLocalStorage() != null) {
      this.route.navigate(['']);
    }
    this.loginForm = new FormGroup({
      usernameOrEmail: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', Validators.required),
    });
  }

  constructor(
    private loginService: LoginService,
    private toast: ToastService,
    private route: Router
  ) {
  }

  get email() {
    return this.loginForm.get('usernameOrEmail');
  }

  get password() {
    return this.loginForm.get('password');
  }

  formSubmit(): void {
    Object.keys(this.loginForm.controls).forEach((key) => {
      this.loginForm.get(key)?.markAsDirty();
      this.loginForm.get(key)?.markAsTouched();
    });
    if (this.loginForm.valid) {
      const data: UserLoginRequest = {
        usernameOrEmail: this.loginForm.value.usernameOrEmail,
        password: this.loginForm.value.password,
      };
      this.loginService.loginUser(data).subscribe({
        next: (res) => {
          this.loginService.setToken(res.data.accessToken);
          this.loginService.getCurrentUser().subscribe({
            next: (user: CurrentUser) => {
              this.loginService.setUserDetailsLocalStorage(user.data);
              console.log('USER --> ', user);
              if (this.loginService.getUserRole() === Roles.User) {
                this.route.navigate(['/exam-portal/dashboard']);
              } else if (this.loginService.getUserRole() === Roles.Admin) {
                this.route.navigate(['register']);
              }
            },
            error: (error) => {
              this.toast.openError(error.error.message);
            },
          });
          this.toast.openSuccess(res.message);
        },
        error: (error) => {
          console.log('ERROR:-> ' + error.error.message);
          this.toast.openError(error.error.message);
        },
      });
    }
    return;
  }

}
