import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { Camera, CameraResultType, Photo } from '@capacitor/camera'
import { Capacitor } from '@capacitor/core';
import { CompartidoService } from 'src/app/compartido-service.service';
import { IPost } from 'src/app/inter/IPost';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { CollectionReference, DocumentData, DocumentReference, Firestore, QueryDocumentSnapshot, addDoc, collection, collectionData, collectionGroup, collectionSnapshots, deleteDoc, doc, documentId, getDoc, getDocs, orderBy, query, setDoc, updateDoc } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { onAuthStateChanged } from '@angular/fire/auth';

@Component({
  selector: 'app-cosas-lindas',
  templateUrl: './cosas-lindas.page.html',
  styleUrls: ['./cosas-lindas.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CosasLindasPage implements OnInit {

  private firestore = inject(Firestore);
  private storage = inject(Storage)

  publicacionesCollection: CollectionReference
  publicaciones$: Observable<IPost[]>;
  favoritosCollection!: CollectionReference;
  favoritos: any[] | undefined;

  public nuevoPostImagen: Photo | void = undefined;
  public comentario = "";
  public verVentanaConfirmacion = new BehaviorSubject<boolean>(false);
  public flagImagenCargo = false;
  public loadingSubiendoFoto = false;

  constructor(
    public _servicioCompartido: CompartidoService,
    public authServ: FirebaseAuthService,
    private chRef: ChangeDetectorRef
  ) { 
    
    this.publicacionesCollection = collection(this.firestore, 'posts/cosas_lindas/publicaciones')
    const q = query(this.publicacionesCollection, orderBy('fecha', 'desc'));
    this.publicaciones$ = collectionData(q, {idField: 'idDoc'}) as Observable<IPost[]>;

    onAuthStateChanged( authServ.getAuth(), (user) => {
      const favQ = collection(this.firestore, 'datos_usuarios/'+user?.uid+'/posts_favoritos')
      getDocs(favQ).then((documents) => {
        this.favoritos = documents.docs.map((d) => ({ id: d.id, likeado: d.data()['likeado'] }))
        console.log(documents)
      })
    })

  }
  
  ngOnInit() {
    this.verVentanaConfirmacion.subscribe( v => {this.chRef.detectChanges()})
    return
  }

  ventanaConfirmacion() {
    this.verVentanaConfirmacion.next(!this.verVentanaConfirmacion.getValue())
  }

  async nuevoPost() {
    await this.subirFoto( this.nuevoPostImagen )
    this.finalizarSubida()
  }

  async tomarFoto() {
    if( !Capacitor.isPluginAvailable('Camera') && Capacitor.isNativePlatform() ) {
      this._servicioCompartido.mensajeError('Error al abrir la camara')
      return
    }

    
    Camera.getPhoto({
    quality: 60,
    resultType: CameraResultType.Uri
    })
    .then((imagen) => {
      this.nuevoPostImagen = imagen
      this.ventanaConfirmacion()
      this.chRef.detectChanges()
    })
    .catch((error) => {
      console.log(error)
    })

    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
  }

  async subirFoto(photo: Photo | void) {
    if( this.authServ.userLogged?.email && photo ) {
      this.loadingSubiendoFoto = true;
      console.time("subiendo al storage")
      console.timeLog("subiendo al storage")
      let direccionArchivo = await this.subirArchivoStorage( photo )
      console.timeEnd("subiendo al storage")
      await addDoc(this.publicacionesCollection, 
        {
          comentario: this.comentario,
          imagenUrl: direccionArchivo,
          fecha: Date.now(), 
          usuario: this.authServ.userLogged?.email ,
          conteoFav: 0,
          listadoUsuariosFav: []
        }
      ).then( (docReference: DocumentReference) => {
        updateDoc(docReference, {
          idDoc: docReference.id
        })
      })
      this.loadingSubiendoFoto = false;
    } else {
      alert(this.authServ.userLogged?.email)
      alert(photo)
      this._servicioCompartido.mensajeError('Error al subir foto')
      this.finalizarSubida(); 
    }
  }

  async subirArchivoStorage(photo: Photo) {
    const respuesta = await fetch(photo.webPath!)
    const blobFoto = await respuesta.blob()

    const nombreArchivo = 'imagenes/cosas_lindas/' + Date.now() + '.jpeg'
    const storageRef = ref(this.storage, nombreArchivo)
    console.time("subiendo")
    console.timeLog("subiendo")
    await uploadBytesResumable(storageRef, blobFoto)
    console.timeEnd("subiendo")
    return getDownloadURL(storageRef)
  }

  finalizarSubida() {
    this.ventanaConfirmacion()
    this.flagImagenCargo = false
    this.nuevoPostImagen = undefined;
    this.comentario = "";
    this.chRef.detectChanges()
  }

  async uriImagenStorage(direccionImagen: string){
    const imgReference = ref(this.storage, direccionImagen)
    const url = await getDownloadURL(imgReference)
    return url
  }

  async imagenNoCargo() {
    this._servicioCompartido.mensajeError("Error al cargar la imagen")
  }

  async darLike(post: IPost ) {

    if( !this.authServ.userLogged?.email ) {
      return
    }

    let nuevaLista = post.listadoUsuariosFav
    if( this.tieneLike(post) ) {
      post.conteoFav = post.conteoFav-1;
      const indiceUsuario = nuevaLista.indexOf(this.authServ.userLogged.email)
      nuevaLista.splice(indiceUsuario, 1)
    } else {
      nuevaLista.push(this.authServ.userLogged.email)
      post.conteoFav = post.conteoFav+1;
    }
    
    const postDocumentRef = doc(this.publicacionesCollection, post.idDoc)
    updateDoc(postDocumentRef, {
      conteoFav: post.conteoFav,
      listadoUsuariosFav: nuevaLista
    })
  }

  tieneLike(post: IPost) {
    return post.listadoUsuariosFav.includes( this.authServ.userLogged?.email??'' )
    //return this.favoritos.find((docFav: any) => {return docFav.idDoc == post.idDoc})['likeado']
  }
  

}

export interface IFavorito {
  likeado: boolean
}