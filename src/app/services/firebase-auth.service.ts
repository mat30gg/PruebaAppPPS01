import { Injectable } from '@angular/core';
import { Auth, User, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  public uId: any = -1;
  public userLogged = this.auth.currentUser; // El usuario cambia con un observable en el appcomponent

  constructor( private auth: Auth) { }

  getAuth() {
    return this.auth;
  }

  logout() {
    signOut(this.auth)
  }

  resetPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email)
  }
}
