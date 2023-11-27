import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { confirmPassword } from 'src/app/Validators/password.validators';
import { LoginService } from 'src/app/shared/services/auth/login.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { UserRegistrationRequest } from 'src/app/shared/models/auth.model';

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
  registerForm!: FormGroup;
  constructor(
    private userService: UserService,
    private loginService: LoginService,
    private toast: NgToastService,
    private route: Router
  ) {}

  ngOnInit(): void {
    if (this.loginService.getTokenFromLocalStorage() != null) {
      this.route.navigate(['']);
    }
    this.registerForm = new FormGroup(
      {
        username: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required),
        repeatPassword: new FormControl('', [Validators.required]),
        tnc: new FormControl(false, Validators.requiredTrue),
      },
      {
        validators: confirmPassword,
      }
    );
  }

  submitted = false;

  get username() {
    return this.registerForm.get('username');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get repeatPassword() {
    return this.registerForm.get('repeatPassword');
  }
  get tnc() {
    return this.registerForm.get('tnc');
  }

  formSubmit() {
    this.submitted = true;
    Object.keys(this.registerForm.controls).forEach((key) => {
      this.registerForm.get(key)?.markAsDirty();
      this.registerForm.get(key)?.markAsTouched();
    });

    if (this.registerForm.valid) {
      const data: UserRegistrationRequest = {
        username: this.registerForm.value.username,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
      };
      console.log("UserRegistrationRequest --> ",data);
      
      this.userService.addUser(data).subscribe({
        next: () => {
          this.route.navigate(['login']);
          this.openSuccess();
        },
        error: (error) => {
          this.openError(error.error);
        },
      });
    }
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
  openError(error: Error) {
    this.toast.error({
      detail: 'Registration Failed!',
      summary: error.message,
      duration: 3000,
      position: 'topRight',
    });
  }
}
