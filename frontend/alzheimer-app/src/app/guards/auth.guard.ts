import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn) {
    return true;
  }

  router.navigate(['/connexion'], { queryParams: { redirect: router.url } });
  return false;
};

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn && authService.isAdmin) {
    return true;
  }

  if (!authService.isLoggedIn) {
    router.navigate(['/connexion'], { queryParams: { redirect: router.url } });
  } else {
    router.navigate(['/']);
  }

  return false;
};

export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Only block if logged in AND has a valid user in memory
  if (authService.isLoggedIn && authService.currentUser) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
