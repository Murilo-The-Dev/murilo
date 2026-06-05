import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const syncToken = this.authService.getTokenSync();

    if (syncToken) {
      return this.forwardWithToken(req, next, syncToken);
    }

    return from(this.authService.getToken()).pipe(
      switchMap((token) => this.forwardWithToken(req, next, token))
    );
  }

  private forwardWithToken(
    req: HttpRequest<unknown>,
    next: HttpHandler,
    token: string | null
  ): Observable<HttpEvent<unknown>> {
    const authReq = token
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;

    return next.handle(authReq).pipe(catchError((err) => this.handleAuthError(err)));
  }

  private handleAuthError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 401) {
      this.authService.logout();
    }

    return throwError(() => error);
  }
}
