import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { TokenService } from '../services/token.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const token = tokenService.getToken();

  if (req.url.includes('/auth/login')) {
    return next(req);
  }

  if (token && tokenService.isTokenExpired(token)) {
    tokenService.logoutAndRedirectToLogin();
    return throwError(() => new Error('La sesión expiró. Inicia sesión nuevamente.'));
  }

  const authRequest = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    : req;

  return next(authRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        tokenService.logoutAndRedirectToLogin();
      }

      return throwError(() => error);
    })
  );
};