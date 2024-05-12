import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {catchError, Observable, tap, throwError} from 'rxjs';
import {Router} from "@angular/router";
import {LoginService} from "../services/auth/login.service";
import {ToastService} from "../services/toast/toast.service";

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private router: Router, private loginService: LoginService, private toast: ToastService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(
        event => {
          try {
            if (event instanceof HttpResponse) {
              if (event.body && event.status) {
                if (event.body?.toast) {
                  this.toast.openSuccess(event.body?.message)
                }
              }
            }
          } catch (error) {
            console.log(error);
          }
        }
      ),
      catchError((error: HttpErrorResponse) => {
        try {
          if (error.status == 401 || error.status == 406) {
            this.loginService.removeTokenFromStorage();
            this.router.navigate(['/login']);
          }
          if (error.status == 500 || error.status == 0) {
            this.toast.openError(error.message);
          }
          if (error.status == 403) {
            this.router.navigate(['/exam-portal/dashboard']);
          } else if (error.error) {
            console.log(error.error)
            this.toast.openError(error.message);
          }
        } catch (error) {
          console.log(error)
          this.toast.openError("Something went Wrong!");
        }
        return throwError(() => error);
      })
    )
  }
}
