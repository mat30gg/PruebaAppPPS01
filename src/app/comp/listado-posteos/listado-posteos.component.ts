import { CommonModule, NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FieldPath, Firestore, collection, collectionGroup, doc, documentId, getDoc, getDocs, limit, query, updateDoc, where } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { IonIcon, IonText, IonImg, IonButton } from "@ionic/angular/standalone";
import { Observable } from 'rxjs';
import { CompartidoService } from 'src/app/compartido-service.service';
import { FavoritousuarioDirective } from 'src/app/directivas/favoritousuario.directive';
import { IPost } from 'src/app/inter/IPost';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { ImagenPostComponent } from '../imagen-post/imagen-post.component';

@Component({
  selector: 'app-listado-posteos',
  templateUrl: './listado-posteos.component.html',
  styleUrls: ['./listado-posteos.component.scss'],
  standalone: true,
  imports: [
    IonButton, 
    IonImg, 
    IonText, 
    CommonModule,
    IonIcon,
    FavoritousuarioDirective,
    ImagenPostComponent
  ],
  providers: [
    CompartidoService
  ]
})
export class ListadoPosteosComponent  implements OnInit {

  @Input({required: true}) publicaciones$!: Observable<IPost[]>
  @Input() verLikes: boolean = false

  constructor(
    private authServ: FirebaseAuthService,
    private db: Firestore,
    private compartido: CompartidoService
  ) { }

  ngOnInit() {
    return
  }

  async darLike(post: IPost | any ) {

    if( !this.authServ.userLogged?.email || !post.idDoc ) {
      this.compartido.mensajeError('Error al dar favorito')
      return
    }
    

    let nuevaLista = post.listadoUsuariosFav
    if( this.tieneLike(post) ) {
      post.conteoFav = post.conteoFav-1;
      const indiceUsuario = nuevaLista.indexOf(this.authServ.userLogged.email)
      nuevaLista.splice(indiceUsuario, 1)
      console.log(post);
      
    } else {
      nuevaLista.push(this.authServ.userLogged.email)
      post.conteoFav = post.conteoFav+1;
      console.log(post);
      
    }

    const grupoColecciones = collectionGroup(this.db, 'publicaciones')
    const q = query(grupoColecciones, where('idDoc', '==', post.idDoc), limit(1))

    const docsQuery = (await getDocs(q)).docs[0]
    if( docsQuery ){
      const postDocumentRef = docsQuery.ref
      updateDoc(postDocumentRef, {
        conteoFav: post.conteoFav,
        listadoUsuariosFav: nuevaLista
      })
    } 

  }

  tieneLike(post: IPost) {
    return post.listadoUsuariosFav.includes( this.authServ.userLogged?.email??'' )
  }

  trackPosts(index: number, itemObject: IPost) {
    return itemObject.idDoc
  }

}
