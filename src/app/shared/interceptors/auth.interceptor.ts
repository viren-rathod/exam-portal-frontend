import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,} from '@angular/common/http';
import {finalize, Observable} from 'rxjs';
import {LoginService} from '../services/auth/login.service';
import {LoaderService} from '../services/loader/loader.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private loginService: LoginService,
    private loaderService: LoaderService
  ) {
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.loaderService.showLoader();
    let authRequest = request;
    const accessToken = this.loginService.getTokenFromLocalStorage();
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

export const authInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
];
