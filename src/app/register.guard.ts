import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';

export const registerGuard: CanActivateFn = async (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const sessionResult = await auth.getSession();
  const session = sessionResult.data.session;

  if (session) {
    router.navigateByUrl('/home'); 
    return false;
  }

  return true;
};