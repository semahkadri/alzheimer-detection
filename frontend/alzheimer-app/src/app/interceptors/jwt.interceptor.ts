import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.accessToken;

  // Skip token for auth endpoints (except /me)
  if (req.url.includes('/api/auth/') && !req.url.includes('/me')) {
    return next(req);
  }

  // Attach token if available
  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // If 401 and not a login/refresh request, try refreshing the token
      if (error.status === 401 && !req.url.includes('/connexion') && !req.url.includes('/refresh-token')) {
        return authService.refreshToken().pipe(
          switchMap(res => {
            if (res?.accessToken) {
              const retryReq = req.clone({
                setHeaders: { Authorization: `Bearer ${res.accessToken}` }
              });
              return next(retryReq);
            }
            authService.deconnexion();
            return throwError(() => error);
          }),
          catchError(() => {
            authService.deconnexion();
            return throwError(() => error);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
