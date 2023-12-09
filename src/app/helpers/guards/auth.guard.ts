import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  let jwtService = inject(AuthService);
  let router = inject(Router);

  if (jwtService.isLoggedIn) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};
