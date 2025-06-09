import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './modules/login/login.component';
import {authInterceptorProviders} from './shared/interceptors/auth.interceptor';
import {RegisterComponent} from './modules/register/register.component';
import {SidenavComponent} from './core/layout/sidenav/sidenav.component';
import {LoaderComponent} from './shared/components/loader/loader.component';
import {NgxPermissionsModule} from 'ngx-permissions';
import {SharedModule} from './shared/shared.module';
import {ErrorHandlerInterceptor} from "./shared/interceptors/error.handler.interceptor";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginSuccessComponent } from './modules/login-success/login-success.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    SidenavComponent,
    LoginSuccessComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    NgxPermissionsModule.forRoot(),
    NgbModule
  ],
  providers: [
    authInterceptorProviders,
    {provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
