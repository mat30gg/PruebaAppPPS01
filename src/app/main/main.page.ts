import { Component, OnInit, inject } from '@angular/core';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import { Router } from '@angular/router';
import { Auth, getAuth, updateCurrentUser, updateProfile } from '@angular/fire/auth';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  constructor( 
    public firebaseAuthService: FirebaseAuthService,
    public router: Router
  ) { }

  ngOnInit() {
    return
  }
  
  logout() {
    this.firebaseAuthService.logout()
    this.router.navigateByUrl('')
  }

}
