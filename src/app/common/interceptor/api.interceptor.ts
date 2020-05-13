import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private authServ: AuthService,
              private snackbar: MatSnackBar) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isLoggedIn = this.authServ.isLoggedIn();
    const token = this.authServ.getToken();

    const isApiUrl = request.url.startsWith(environment.apiUrl);
    if (isLoggedIn && isApiUrl) {
        request = request.clone({
            setHeaders: {
                Authorization: `Basic ${token}`
            }
        });
    }
    return next.handle(request)
    .pipe(catchError(err => {
      if (err.status === 401) {
          this.authServ.logout();
      }
      const error = err.error.message || err.statusText;
      this.snackbar.open(error, 'Ok', {
        duration: 3000
      });
      return throwError(error);
    }));
  }
}
