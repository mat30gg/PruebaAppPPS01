import { Component} from '@angular/core';
import { Auth, signInWithEmailAndPassword} from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tab1',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage {

  public cargandoLogin = false;

  formlogin : FormGroup

  usersArray:any[] = [];

  public logged : boolean

  public alertMessage : string
  public alertOpen : boolean
  public alertButtons : Array<any> = []

  public animacionClase_titulo = ''

  constructor(
    private auth : Auth, 
    private router : Router,
    private _snackBar: MatSnackBar
  ) {

    setInterval(() => {
      this.animacionClase_titulo = 'animate__bounce animate__slow'
    }, 4000)

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
      this.cargandoLogin = true
      await signInWithEmailAndPassword(this.auth, email, pass)

      this._snackBar.open("Iniciando sesion...",'', {
        duration: 2000,
        panelClass: ['snackbar-success']
      })
      setTimeout(() => {
        this.formlogin.reset({email: '', pass: ''})
        this.router.navigate([''])
      }, 2000);

      this.cargandoLogin = false
    } catch (error : any) {
      this._snackBar.open("Credenciales incorrectas",'', {
        duration: 2000,
        panelClass: ['snackbar-danger']
      })
    }
  }

  cargarDatosPrueba(email: string, pass: string) {
    this.formlogin.setValue({
      email: email,
      pass: pass
    })
  }

}
