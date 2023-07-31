import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { LoginService } from 'src/app/services/login.service';

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
  ngOnInit(): void {}
  constructor(
    private loginService: LoginService,
    private toast: NgToastService
  ) {}
  loginData = new FormGroup({
    usernameOrEmail: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', Validators.required),
  });

  get email() {
    return this.loginData.get('usernameOrEmail');
  }
  get password() {
    return this.loginData.get('password');
  }

  formSubmit() {
    this.loginService.loginUser(this.loginData.value).subscribe({
      next: (data: any) => {
        this.loginService.setToken(data.accessToken);
        this.loginService.getCurrentUser().subscribe({
          next: (user: any) => {
            console.log('use :-> ', user);
          },
          error: (e) => {
            console.error(e);
          },
        });
        this.openSuccess();
      },
      error: (error) => {
        console.log('ERROR:-> ' + error.error.message);
        this.openError(error.error);
      },
    });
    return;
  }
  //toasts
  openSuccess() {
    this.toast.success({
      detail: 'Logied In',
      summary: 'Login Successfully!',
      duration: 3000,
      position: 'topRight',
    });
  }
  openError(error: any) {
    this.toast.error({
      detail: 'Login Failed!',
      summary: error.message,
      duration: 3000,
      position: 'topRight',
    });
  }
}
