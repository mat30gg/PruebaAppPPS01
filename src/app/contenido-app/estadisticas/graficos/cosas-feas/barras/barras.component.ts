import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CollectionReference, Firestore, collection, collectionSnapshots } from '@angular/fire/firestore';
import { EChartsOption, TooltipComponentFormatterCallbackParams } from 'echarts';
import { provideEcharts } from 'ngx-echarts';

@Component({
  selector: 'app-barras',
  templateUrl: './barras.component.html',
  styleUrls: ['./barras.component.scss'],
  providers: [
    provideEcharts(),
  ]
})
export class BarrasComponent  implements OnInit, AfterViewInit {


  public opcionesCambio: EChartsOption;
  public opciones:  EChartsOption;
  private publicacionesCollection: CollectionReference
  private dataSet : any[] = [];
  public loading = true;

  constructor(
    private fire: Firestore,
  ) { 

    this.publicacionesCollection = collection(this.fire, "posts/cosas_feas/publicaciones/")

    


    this.opciones = {
      title: {
        left: '50%',
        text: 'Favoritos publicaciones',
        textAlign: 'center',
        subtext: 'Cosas feas'
      },
      tooltip: {
        trigger: 'item',
        triggerOn: 'click',
        position: 'inside',
        displayMode: 'single',
        formatter: (params: any) => {
          if( params ) {
            return "<img src='"+params.value[2]+"' style='height: 10rem'></img>"
          } else {
            return "no image"
          }
        }
      },
      xAxis: {
        type: 'category',
        // axisTick <= el 'tick' es el palito que esta sobre la linea del eje x que esta entre el label y la barra
      },
      yAxis: {},
      series: {
        name: "favs",
        type: 'bar',
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
          this.dataSet.push( [d.data()['comentario'], d.data()['conteoFav'], d.data()['imagenUrl']] )
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
