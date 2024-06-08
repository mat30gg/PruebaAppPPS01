import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import { Router } from '@angular/router';
import { Auth, getAuth, updateCurrentUser, updateProfile } from '@angular/fire/auth';
import { AlarmaActivaService } from '../alarma-activa.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  public nombre = "";
  public logoutHabilitado = true

  constructor( 
    public firebaseAuthService: FirebaseAuthService,
    public router: Router,
    public alarmaActiva: AlarmaActivaService,
    public changeDetectorRef: ChangeDetectorRef
  ) { 
    this.alarmaActiva.activada$.subscribe((value) => {
      this.logoutHabilitado = value;
      changeDetectorRef.detectChanges()
    })
  }

  ngOnInit() {
    return
  }
  
  logout() {
    this.firebaseAuthService.logout()
    this.router.navigateByUrl('/login')
  }

}
