import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData, collectionGroup, collectionSnapshots, getDoc, getDocs, orderBy, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IPost } from 'src/app/inter/IPost';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';

@Component({
  selector: 'app-posts-usuario',
  templateUrl: './posts-usuario.page.html',
  styleUrls: ['./posts-usuario.page.scss'],
})
export class PostsUsuarioPage implements OnInit {

  public publicaciones$: Observable<IPost[]>

  constructor(
    private auth: FirebaseAuthService,
    private db: Firestore
  ) { 
    const grupoColecciones = collectionGroup(this.db, 'publicaciones')
    const q = query(grupoColecciones, where("usuario", "==", this.auth.userLogged?.email), orderBy('fecha', 'desc') )
    this.publicaciones$ = collectionData(q, {idField: 'idPost'}) as Observable<IPost[]>
  }

  ngOnInit() {
    return
  }

}
