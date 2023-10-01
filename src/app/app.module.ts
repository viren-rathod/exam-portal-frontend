import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './modules/login/login.component';
import { authIntercepterProviders } from './shared/interceptors/auth.interceptor';
import { RegisterComponent } from './modules/register/register.component';
import { SideNavigationComponent } from './core/layout/side-navigation/side-navigation.component';
import { SidenavComponent } from './core/layout/sidenav/sidenav.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    SideNavigationComponent,
    SidenavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [authIntercepterProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
