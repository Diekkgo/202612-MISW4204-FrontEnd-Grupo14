import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const tokenService = inject(TokenService);
  const token = tokenService.getToken();

  const excludeUrls = [
    'api/v1/auth/login'
  ];

  const isExcluded = excludeUrls.some(url => req.url.includes(url));

  if(isExcluded){
    return next(req);
  }

  if(token && tokenService.isTokenExpired(token)){
    tokenService.logoutAndRedirectToLogin();
    return next(req);
  }

  const request = token ? req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  }) : req;

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if(error.status === 401){
        tokenService.logoutAndRedirectToLogin();
      }

      return throwError(() => error);
    })
  )
};
