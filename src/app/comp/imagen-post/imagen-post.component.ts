import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonSpinner } from '@ionic/angular/standalone';
import { IonImg } from '@ionic/angular/standalone';

@Component({
  selector: 'app-imagen-post',
  templateUrl: './imagen-post.component.html',
  styleUrls: ['./imagen-post.component.scss'],
  standalone: true,
  imports: [
    IonImg,
    IonSpinner,
    NgIf
  ],
  
})
export class ImagenPostComponent{

  @Input() url: string = ''
  public cargando: boolean = true

  constructor() { }


}
