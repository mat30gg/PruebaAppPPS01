import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import { Router } from '@angular/router';
import { Auth, getAuth, updateCurrentUser, updateProfile } from '@angular/fire/auth';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  public nombre = "";

  constructor( 
    public firebaseAuthService: FirebaseAuthService,
    public router: Router
  ) { }

  ngOnInit() {
    if( !this.firebaseAuthService.getFirebaseUser() ) {
      this.router.navigateByUrl('')
    } else {
      this.router.navigateByUrl('main')
    }
  }
  
  logout() {
    this.firebaseAuthService.logout()
  }

}
