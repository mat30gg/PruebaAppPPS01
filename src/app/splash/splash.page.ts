import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthService } from '../services/firebase-auth.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor( 
    public router: Router,
    public firebaseAuthService: FirebaseAuthService
  ) { 
    setTimeout(() => {
      if( this.firebaseAuthService.getFirebaseUser() ) {
        router.navigateByUrl('')
      } else {
        router.navigateByUrl('/login');
      }
    }, 3500)
  }

  ngOnInit() {
    return
  }

}
