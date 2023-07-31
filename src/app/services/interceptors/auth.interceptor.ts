import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private loginSevice: LoginService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let authRequest = request;
    const accessToken = this.loginSevice.getTokenFromLocalStorage();
    if (accessToken != null) {
      authRequest = authRequest.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }
    return next.handle(authRequest);
  }
}

export const authIntercepterProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
];
