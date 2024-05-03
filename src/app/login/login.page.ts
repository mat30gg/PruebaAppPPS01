import { Component, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, user } from '@angular/fire/auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseError } from '@angular/fire/app';

@Component({
  selector: 'app-tab1',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage {

  formlogin : FormGroup

  usersArray:any[] = [];

  public logged : boolean

  public alertMessage : string
  public alertOpen : boolean
  public alertButtons : Array<any> = []


  constructor(
    private auth : Auth, 
    private router : Router,
    private fireAuthServ: FirebaseAuthService,
    private _snackBar: MatSnackBar
  ) {
    let formbuilder = new FormBuilder()
    this.formlogin = formbuilder.group({
      email: ["", Validators.required],
      pass: ["", Validators.required]
    })
    this.logged = false

    this.alertMessage = ""
    this.alertOpen = false
  }

  async login() {
    let email = this.formlogin.get('email')?.value
    let pass = this.formlogin.get('pass')?.value
    try {
      await signInWithEmailAndPassword(this.auth, email, pass)
      this._snackBar.open("Iniciando sesion...",'', {
        duration: 2000,
        panelClass: ['snackbar-success']
      })
      setTimeout(() => {
        this.router.navigate(['main'])
      }, 2000);
    } catch (error : any) {
      this._snackBar.open("Credenciales incorrectas",'', {
        duration: 2000,
        panelClass: ['snackbar-danger']
      })
    }
  }

}
