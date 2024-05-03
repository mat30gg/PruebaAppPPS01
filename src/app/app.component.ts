import { Component, OnInit } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { Router } from '@angular/router';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { FirebaseAuthService } from './services/firebase-auth.service';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  constructor( 
    public router: Router, 
    public auth: Auth,
    public firebaseAuthService: FirebaseAuthService
    ) { 
    onAuthStateChanged( auth, (user) => {
      if(user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user  
        this.firebaseAuthService.uId = user.uid;
        this.firebaseAuthService.userLogged = user;

      } else {
        // User is signed out
        // ...
        this.firebaseAuthService.uId = -1;
        this.firebaseAuthService.userLogged = null;
      }
    })
  }

  ngOnInit() {
    SplashScreen.hide()
    this.router.navigateByUrl('splash')
  }
}
