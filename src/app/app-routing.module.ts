import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgToastModule, NgToastComponent } from 'ng-angular-popup';
import { LoginComponent } from './modules/login/login.component';
import { authGuard } from './shared/guard/auth.guard';
import { RegisterComponent } from './modules/register/register.component';
import { SidenavComponent } from './core/layout/sidenav/sidenav.component';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
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
    path: '',
    component: SidenavComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        pathMatch: "full"
      }
    ]

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), NgToastModule],
  exports: [RouterModule, NgToastComponent],
})
export class AppRoutingModule { }
