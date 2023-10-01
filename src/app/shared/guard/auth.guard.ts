import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);
  console.log('token :--> ', token);
  if (token) {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};
