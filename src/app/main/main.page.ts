import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import { Router } from '@angular/router';
import { Auth, getAuth, updateCurrentUser, updateProfile } from '@angular/fire/auth';
import { TemaSalaService } from '../services/tema-sala.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  public nombre = "";

  constructor( 
    public firebaseAuthService: FirebaseAuthService,
    public router: Router,
    public temaSala: TemaSalaService
  ) { }

  ngOnInit() {
    return
  }
  
  logout() {
    this.firebaseAuthService.logout()
    this.router.navigateByUrl('login')
  }

}
