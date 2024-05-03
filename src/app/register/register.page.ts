import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth'
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'
import { FirebaseAuthService } from '../services/firebase-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  public formRegister: FormGroup;

  constructor( 
    public auth: Auth,
    private _snackBar: MatSnackBar,
    private fireAuthServ: FirebaseAuthService
  ) { 
    let formBuilder = new FormBuilder()
    this.formRegister = formBuilder.group(
      {

        email: ["", [Validators.required, Validators.email],],
        name: ["", [Validators.required]],
        pass: ["", {validators: [Validators.required], updateOn: 'blur'}], 
        // Hacer "updateOn: blur", los datos se actualizan en el control
        // cuando pierde focus y no hace que se muestre el snackbar cada
        // vez que se escribe en un control.
        confirmPass: ["", {validators: [Validators.required], updateOn: 'blur'}],
        gender: ["m", [Validators.required]]
      },
      {
        validators: this.passwordMatchValidator
      }
    );


    this.formRegister.valueChanges.subscribe( data => {
      if( this.formRegister.hasError('distintos') && this.formRegister.get('confirmPass')?.dirty ) {
        this._snackBar.open('Las contraseñas no coinciden', '', {duration: 2000})
      }
    })
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('pass')?.value === form.get('confirmPass')?.value
      ? null
      : { distintos: true }
  }

  async registrar() {
    if( this.formRegister.valid ) {
      await this.registrarUsuario()
      inject(Router).navigateByUrl('')
    }
  }
  
  async registrarUsuario() {
    let nuevoUsuario = {
      email: this.formRegister.get('email')?.value,
      pass: this.formRegister.get('pass')?.value,
      nombre: this.formRegister.get('name')?.value
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, nuevoUsuario.email, nuevoUsuario.pass);
      updateProfile(userCredential.user, { displayName: this.formRegister.get('nombre')?.value });
    } catch (error) {
      console.log(error);
    }
  }
}
