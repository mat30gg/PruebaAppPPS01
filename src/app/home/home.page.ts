import { Component, OnInit, inject } from '@angular/core';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage  {

  constructor( 
    public fireServ: FirebaseAuthService,
    public router: Router 
  ) { }

  logout() {
    this.fireServ.logout()
    this.router.navigateByUrl('')
  }
}
