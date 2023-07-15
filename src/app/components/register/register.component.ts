import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
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
export class RegisterComponent implements OnInit {
  constructor(
    private userService: UserService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {}

  registerationData = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  get username() {
    return this.registerationData.get('username');
  }
  get email() {
    return this.registerationData.get('email');
  }
  get password() {
    return this.registerationData.get('password');
  }

  res: any;
  formSubmit() {
    const req = this.userService
      .addUser(this.registerationData.value)
      .subscribe({
        next: (data) => {
          this.openSuccess();
        },
        error: (error) => {
          this.openError(error.error);
        },
      });
    return;
  }

  //toasts
  openSuccess() {
    this.toast.success({
      detail: 'Registered',
      summary: 'Registered Successfully!',
      duration: 3000,
      position: 'topRight',
    });
  }
  openError(error: any) {
    this.toast.error({
      detail: 'Registration Failed!',
      summary: error.message,
      duration: 3000,
      position: 'topRight',
    });
  }
}
