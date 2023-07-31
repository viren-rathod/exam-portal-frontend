import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { confirmPassword } from 'src/app/Validators/password.validators';
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
    private toast: NgToastService,
    private route: Router
  ) {}

  ngOnInit(): void {}

  submitted = false;
  registerationData = new FormGroup(
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

  get username() {
    return this.registerationData.get('username');
  }
  get email() {
    return this.registerationData.get('email');
  }
  get password() {
    return this.registerationData.get('password');
  }
  get repeatPassword() {
    return this.registerationData.get('repeatPassword');
  }
  get tnc() {
    return this.registerationData.get('tnc');
  }

  res: any;
  formSubmit() {
    this.submitted = true;
    Object.keys(this.registerationData.controls).forEach((key) => {
      this.registerationData.get(key)?.markAsDirty();
      this.registerationData.get(key)?.markAsTouched();
    });

    if (this.registerationData.valid) {
      this.userService.addUser(this.registerationData.value).subscribe({
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
  openError(error: any) {
    this.toast.error({
      detail: 'Registration Failed!',
      summary: 'Can\'t Register due to Error!!',
      duration: 3000,
      position: 'topRight',
    });
  }
}
