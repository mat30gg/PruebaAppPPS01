import { Component } from '@angular/core';
import { Auth, inMemoryPersistence, signInWithEmailAndPassword} from '@angular/fire/auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompartidoService } from '../compartido.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage {

  public cargandoLogin = false

  formlogin : FormGroup

  usersArray:any[] = [];

  public logged : boolean

  public alertButtons : Array<any> = []


  constructor(
    private auth : Auth, 
    private router : Router,
    private fireAuthServ: FirebaseAuthService,
    private _snackBar: MatSnackBar,
    private compartido: CompartidoService
  ) {
    let formbuilder = new FormBuilder()
    this.formlogin = formbuilder.group({
      email: ["", [Validators.required, Validators.email]],
      pass: ["", Validators.required]
    })
    this.logged = false
  }

  async login() {
    let email = this.formlogin.get('email')?.value
    let pass = this.formlogin.get('pass')?.value
    try {
      this.cargandoLogin = true
      await this.auth.setPersistence(inMemoryPersistence)
      .then(() => {
        return signInWithEmailAndPassword(this.auth, email, pass)
      })
      this.compartido.claveAcceso = this.formlogin.get('pass')?.value
      this._snackBar.open("Iniciando sesion...",'', {
        duration: 2000,
        panelClass: ['snackbar-success']
      })
      setTimeout(() => {
        this.formlogin.reset({email: '', pass: ''})
        this.router.navigate(['main'])
      }, 2000);
    } catch (error : any) {
      this._snackBar.open("Credenciales incorrectas",'', {
        duration: 2000,
        panelClass: ['snackbar-danger']
      })
    } finally {
      this.cargandoLogin = false
    }
  }

  cargarDatosPrueba1() {
    this.formlogin.setValue({
      email: "usuario@usuario.com",
      pass: "333333"
    })
  }

}
