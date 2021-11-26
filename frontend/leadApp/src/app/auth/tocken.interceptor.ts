import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TockenInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const currentUser = this.authService.currentUserValue;
    const isLoggedIn = this.authService.loggedIn();
    if (isLoggedIn) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      })
    }
    return next.handle(request).pipe(catchError(error => {
      if([401,403].indexOf(error.status)!== -1){
        this.authService.logout()
      }
      return throwError(error);
    }))
  }
}

export const tokenInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: TockenInterceptor,
  multi: true,
};
