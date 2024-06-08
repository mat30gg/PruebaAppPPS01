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

  public nuevoNombre: string = this.authService.userLogged?.displayName ?? '';

  constructor( 
    public authService: FirebaseAuthService,
    public router: Router
  ) { }

  ngOnInit() {
    return
  }
  
  logout() {
    this.authService.logout()
    this.router.navigateByUrl('/login')
  }

  cambiarNombre() {
    if( this.authService.userLogged)
      updateProfile(this.authService.userLogged, {displayName: this.nuevoNombre })
      .then(() => { console.log("Nombre cambiado con exito") })
      .catch((error) => { console.log("error: ", error) })
  }

}
