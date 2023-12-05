import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './modules/login/login.component';
import { authIntercepterProviders } from './shared/interceptors/auth.interceptor';
import { RegisterComponent } from './modules/register/register.component';
import { SidenavComponent } from './core/layout/sidenav/sidenav.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    SidenavComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    NgxPermissionsModule.forRoot(),
  ],
  providers: [authIntercepterProviders],
  bootstrap: [AppComponent],
})
export class AppModule { }
