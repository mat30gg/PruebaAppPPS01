import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { FirebaseAuthService } from '../services/firebase-auth.service';

export const userLoggedGuard: CanActivateFn = (route, state) => {
  return inject(FirebaseAuthService).userLogged 
  ? true
  : route.params[''];
};
