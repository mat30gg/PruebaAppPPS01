import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CountUpModule } from 'ngx-countup';

@NgModule({
  declarations: [
    AppComponent, 
  ],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CountUpModule,
    IonicModule.forRoot(), 
    AppRoutingModule, provideFirebaseApp(() => initializeApp({"projectId":"pps-01-4ac3c","appId":"1:970078539288:web:6d7000a8f23ba2f8bfbd6d","storageBucket":"pps-01-4ac3c.appspot.com","apiKey":"AIzaSyCUmDHvD7xhQKK5yFSgh8HtRNlMgwZ4P1A","authDomain":"pps-01-4ac3c.firebaseapp.com","messagingSenderId":"970078539288"})), 
    provideAuth(() => getAuth()), 
    provideFirestore(() => getFirestore()), 
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
