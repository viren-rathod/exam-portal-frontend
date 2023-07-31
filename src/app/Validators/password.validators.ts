import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const confirmPassword: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  let password = control.get('password');
  let repeatPaswword = control.get('repeatPassword');
  return password?.value === repeatPaswword?.value
    ? null
    : { passwordMatchError: true };
};
