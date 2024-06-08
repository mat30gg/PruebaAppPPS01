import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CollectionReference, Firestore, collection, collectionSnapshots} from '@angular/fire/firestore';
import { EChartsOption } from 'echarts';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';

@Component({
  selector: 'app-rueda',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './rueda.component.html',
  styleUrls: ['./rueda.component.scss'],
  providers: [
    provideEcharts(),
  ]
})
export class RuedaComponent  implements OnInit, AfterViewInit {

  public opcionesCambio: EChartsOption;
  public opciones:  EChartsOption;
  private publicacionesCollection: CollectionReference
  private dataSet : any[] = [];
  public loading = true;

  constructor(
    private fire: Firestore,
  ) { 

    this.publicacionesCollection = collection(this.fire, "posts/cosas_lindas/publicaciones/")

    this.opciones = {
      title: {
        left: '50%',
        text: 'Favoritos publicaciones',
        textAlign: 'center',
        subtext: 'Cosas lindas'
      },
      tooltip: {
        trigger: 'item',
        triggerOn: 'click',
        position: 'inside',
        displayMode: 'single',
        formatter: (params: any) => {
          console.log(params)
          if( params ) {
            return "<img src='"+params.data.imagen+"' style='height: 10rem'></img>"
          } else {
            return "no image"
          }
        }
      },
      series: {
        name: "favs",
        type: 'pie',
        data: this.dataSet
      }
    }
    this.opcionesCambio = this.opciones
  } 
  
  ngOnInit(): void {
    return
  }

  ngAfterViewInit(): void { // || IMPORTANTE || CARGAR DATOS DESPUES DE QUE SE CARGE LA VISTA DEL CHART
    collectionSnapshots(this.publicacionesCollection)
    .subscribe(value => {
      this.loading = true
      this.dataSet = []
      value.forEach(d => {
        if(d){
          this.dataSet.push( {name: d.data()['comentario'],value: d.data()['conteoFav'],imagen: d.data()['imagenUrl']} )
        }
      })
      this.opcionesCambio = {
        series: {
          data: this.dataSet
        }
      }
      this.loading = false
    })
    return
  }
  
}