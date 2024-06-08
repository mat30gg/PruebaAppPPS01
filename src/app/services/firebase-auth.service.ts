import { Injectable } from '@angular/core';
import { Auth, User, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  public uId: any = null;
  public userLogged: User | null = null;

  constructor( private auth: Auth) { }

  getFirebaseUser() {
    return this.auth.currentUser
  }

  logout() {
    signOut(this.auth)
  }

  resetPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email)
  }
}
