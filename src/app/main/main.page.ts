import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import { Router } from '@angular/router';
import { DocumentReference, deleteDoc, setDoc } from '@angular/fire/firestore';
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerCameraDirection, CapacitorBarcodeScannerTypeHint } from '@capacitor/barcode-scanner'
import { DatosUsuariosService } from '../services/datos-usuarios.service';
import { UsuarioCreditosService } from '../services/usuario-creditos.service';
import { CompartidoService } from '../services/compartido.service';
import { CountUpDirective } from 'ngx-countup'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('creditosCountUp', { read: CountUpDirective }) creditosCountUp: CountUpDirective | any

  public credito: number = 0
  public anterior: number = 0
  public codigosUsados: string[] = []
  public perfil: string = ''
  public refDocCreditos: DocumentReference | undefined
  public valoresCodigos: ICodigoValor[] = [
    { codigo: '8c95def646b6127282ed50454b73240300dccabc', valor: 10 },
    { codigo: 'ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172', valor: 50 },
    { codigo: '2786f4877b9091dcad7f35751bfcf5d5ea712b2f', valor: 100 }
  ]
  public cargando: boolean = false

  private subCreditos: Subscription
  private subDatos: Subscription

  constructor(
    public firebaseAuthService: FirebaseAuthService,
    public router: Router,
    public usrDatos: DatosUsuariosService,
    public usrCreditos: UsuarioCreditosService,
    public compartido: CompartidoService,
    public changeDetectorRef: ChangeDetectorRef
  ) { 
    this.subCreditos = this.usrCreditos.datos$.subscribe(value => {
      this.credito = value?.credito ?? 0
      this.codigosUsados = value?.codigos_usados ?? []
      })
    this.subDatos = this.usrDatos.datos$.subscribe(value => {
      this.perfil = value.perfil ?? ''
    })
  }

  ngOnInit() {
    return
  }

  ngAfterViewInit(): void {
    this.usrCreditos.datos$.subscribe(() => {
      this.creditosCountUp.countUp.update(this.credito)
    })
  }

  ngOnDestroy(): void {
    this.credito = 0
    this.codigosUsados = []
    this.subCreditos.unsubscribe()
    this.subDatos.unsubscribe()
  }

  logout() {
    this.firebaseAuthService.logout()
    this.router.navigateByUrl('/login')
  }

  limpiarCredito() {
    if (this.usrCreditos.docRefCreditoUsuario)
      setDoc(this.usrCreditos.docRefCreditoUsuario, {})
  }

  escanearCodigo() {
    CapacitorBarcodeScanner.scanBarcode(
      {
        hint: CapacitorBarcodeScannerTypeHint.QR_CODE,
        cameraDirection: CapacitorBarcodeScannerCameraDirection.BACK,
        scanInstructions: 'Posicione el codigo QR en el recuadro'
      })
      .then(async (value) => {
        const codigoQR = value.ScanResult.trim()
        this.agregarCredito(codigoQR)
      })
      .catch(error => {
        console.error(error);
      })
  }

  async agregarCredito(codigoQR: string) {
    const vecesUsado = this.codigosUsados.filter(v => v == codigoQR).length
    console.log("Perfil: ", this.perfil);
    console.log("Veces usado: ", vecesUsado);
    
    if ((this.perfil != 'admin' && vecesUsado >= 1) || (this.perfil == 'admin' && vecesUsado >= 2)) {
      this.cargando = true
      setTimeout(() => {
        this.compartido.mensajeError('No puede usar mas este codigo')
        this.cargando = false
      }, 600)

    } else {
      this.cargando = true
      setTimeout(() => {
        this.addCodigoCredito(codigoQR)
          .then(() => this.cargando = false)
        this.compartido.showSnackBar('Creditos cargados con exito', 'Ok', 'snackbar-success')
      }, 1000)
    }
  }

  valorCodigo(codigoqr: string) {
    return this.valoresCodigos.find(v => v.codigo == codigoqr)?.valor
  }

  async addCodigoCredito(codigoqr: string) {
    const valor = this.valorCodigo(codigoqr)
    if (valor && this.usrCreditos.docRefCreditoUsuario) {
      this.codigosUsados.push(codigoqr)
      this.credito += valor
      setDoc(this.usrCreditos.docRefCreditoUsuario, { codigos_usados: this.codigosUsados, credito: this.credito }, { merge: true })
    }
  }
}

export interface ICodigoValor {
  codigo: string,
  valor: number
}