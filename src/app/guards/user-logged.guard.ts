import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { FirebaseAuthService } from '../services/firebase-auth.service';

export const userLoggedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  return inject(FirebaseAuthService).userLogged 
  ? true
  : router.parseUrl('login')
};
