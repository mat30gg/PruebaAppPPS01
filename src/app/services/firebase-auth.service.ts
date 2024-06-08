import { Injectable } from '@angular/core';
import { Auth, User, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, Persistence, setPersistence, inMemoryPersistence } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  public uId: any = -1;
  public userLogged: User | null = null;

  constructor( private auth: Auth) { 
    auth.setPersistence(inMemoryPersistence)
    
  }

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
