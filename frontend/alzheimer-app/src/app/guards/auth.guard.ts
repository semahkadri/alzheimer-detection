import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn && !authService.isTokenExpired()) {
    return true;
  }

  // Token missing or expired — clean up and redirect
  if (authService.isLoggedIn) authService.deconnexion();
  router.navigate(['/connexion'], { queryParams: { redirect: router.url } });
  return false;
};

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn && !authService.isTokenExpired() && authService.isAdmin) {
    return true;
  }

  if (!authService.isLoggedIn || authService.isTokenExpired()) {
    if (authService.isLoggedIn) authService.deconnexion();
    router.navigate(['/connexion'], { queryParams: { redirect: router.url } });
  } else {
    router.navigate(['/']);
  }

  return false;
};

export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn && authService.currentUser && !authService.isTokenExpired()) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
