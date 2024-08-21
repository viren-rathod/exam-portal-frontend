import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { LoginService } from '../services/auth/login.service';

export const authGuard: CanActivateFn = (_route, _state) => {
  const token = localStorage.getItem('token');

  const router = inject(Router);
  const permissionService = inject(NgxPermissionsService);
  const userService = inject(LoginService);

  const roles = [userService.getUserRole()!];
  permissionService.loadPermissions(roles);
  if (token) {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};
