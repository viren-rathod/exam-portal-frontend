import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NgToastComponent, NgToastModule} from 'ng-angular-popup';
import {LoginComponent} from './modules/login/login.component';
import {authGuard} from './shared/guard/auth.guard';
import {RegisterComponent} from './modules/register/register.component';
import {SidenavComponent} from './core/layout/sidenav/sidenav.component';
import {Roles} from './shared/enums/roles.enum';
import {ngxPermissionsGuard} from 'ngx-permissions';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { LoginSuccessComponent } from './modules/login-success/login-success.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/exam-portal/dashboard',
    pathMatch: 'full',
  },
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
    path: 'exam-portal',
    component: SidenavComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'admin',
        canActivate: [ngxPermissionsGuard],
        data: {
          permissions: {
            only: [Roles.Admin,],
            redirectTo: '/exam-portal/dashboard'
          }
        },
        loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
      },
      {
        path: 'user',
        canActivate: [ngxPermissionsGuard],
        data: {
          permissions: {
            only: Roles.User,
          }
        },
        loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
    ]

  },
  { path: 'login-success', component: LoginSuccessComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), NgToastModule],
  exports: [RouterModule, NgToastComponent],
})
export class AppRoutingModule {
}
