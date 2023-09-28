import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { NgToastModule, NgToastComponent } from 'ng-angular-popup';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './services/guard/auth.guard';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './modules/admin/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
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
    component: NavbarComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        // pathMatch: 'full',
        canActivate: [authGuard],
        children: [
          {
            path: 'profile',
            component: ProfileComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), NgToastModule],
  exports: [RouterModule, NgToastComponent],
})
export class AppRoutingModule {}
