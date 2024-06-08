import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Animation, AnimationController } from '@ionic/angular';
import { AnimationBuilder, AnimationMetadata, animate, style } from '@angular/animations';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss', './flags.scss'],
})
export class MainPage implements OnInit {

  public rutaActual: string = ''
  public idiomaActual: string = 'es'
  public segmentoActual: string = ''

  constructor( 
    public firebaseAuthService: FirebaseAuthService,
    public router: Router,
    public route: ActivatedRoute,
    private animationCtrl: AnimationController,
    private animationBuil: AnimationBuilder
  ) { 
    
    
    this.router.events.subscribe(event => { 
      if(event.type == 1) {
        const navegacionActual = this.router.getCurrentNavigation();
        this.rutaActual = event.url.split('?')[0]
        if( navegacionActual ){
          const arraySegmentos = navegacionActual.extractedUrl.root.children['primary'].segments
          this.segmentoActual = arraySegmentos[arraySegmentos.length-1].path??this.segmentoActual
          this.idiomaActual = navegacionActual.extractedUrl.queryParams['idioma']??this.idiomaActual
          console.log(this.segmentoActual);
        }
      }
    })
  }

  ngOnInit() {
    return
  }
  
  logout() {
    this.firebaseAuthService.logout()
    this.router.navigateByUrl('/login');
  }

}
