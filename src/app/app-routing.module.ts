import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgToastModule, NgToastComponent } from 'ng-angular-popup';
import { LoginComponent } from './modules/login/login.component';
import { authGuard } from './shared/guard/auth.guard';
import { RegisterComponent } from './modules/register/register.component';
import { SidenavComponent } from './core/layout/sidenav/sidenav.component';
import { ProfileComponent } from './modules/admin/profile/profile.component';

const routes: Routes = [
  // {
  //   path: '',
  //   // redirectTo: '/home',
  //   pathMatch: 'full',
  // },
  {
    path: 'register',
    component: RegisterComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: '',
    component: SidenavComponent,
    canActivate: [authGuard],
    data: { onToggleSidenav: 'onToggleSidenav' },
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
        pathMatch: 'full'
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), NgToastModule],
  exports: [RouterModule, NgToastComponent],
})
export class AppRoutingModule { }
