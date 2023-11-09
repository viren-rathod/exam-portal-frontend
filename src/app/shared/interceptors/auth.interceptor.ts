import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoginService } from '../services/login.service';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private loginSevice: LoginService,
    private loaderService: LoaderService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.loaderService.showLoader();
    let authRequest = request;
    const accessToken = this.loginSevice.getTokenFromLocalStorage();
    if (accessToken != null) {
      authRequest = authRequest.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }
    return next.handle(authRequest).pipe(
      finalize(() => {
        this.loaderService.hideLoader();
      })
    );
  }
}

export const authIntercepterProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
];
