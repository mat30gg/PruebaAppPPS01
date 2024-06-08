import { Injectable } from '@angular/core';
import { Auth, User, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  public uId: any = -1;
  public userLogged: User | null = this.auth.currentUser;

  constructor( private auth: Auth) { }

  logout() {
    signOut(this.auth)
  }

  resetPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email)
  }
}
