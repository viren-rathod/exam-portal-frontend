import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { NgToastModule,NgToastComponent } from 'ng-angular-popup';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes), NgToastModule],
  exports: [RouterModule,NgToastComponent],
})
export class AppRoutingModule {}
