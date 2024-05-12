import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const confirmPassword: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  let password = control.get('password');
  let repeatPassword = control.get('repeatPassword');
  return password?.value === repeatPassword?.value
    ? null
    : { passwordMatchError: true };
};
