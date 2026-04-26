import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const roleGuard: CanActivateFn = (route) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  if (!tokenService.hasToken()) {
    tokenService.clearSession();
    return router.createUrlTree(['/auth']);
  }

  const allowedRoles = route.data?.['roles'] as string[] | undefined;

  if (!allowedRoles || allowedRoles.length === 0) {
    return true;
  }

  if (tokenService.hasRole(...allowedRoles)) {
    return true;
  }

  if (tokenService.isAdmin() || tokenService.isProfessor()) {
    return router.createUrlTree(['/assignments']);
  }

  if (tokenService.isStudent()) {
    return router.createUrlTree(['/tasks']);
  }

  tokenService.clearSession();
  return router.createUrlTree(['/auth']);
};