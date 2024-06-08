import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
})
export class EstadisticasPage implements OnInit {

  public tabSeleccionada = 'cosas_lindas'

  constructor() { }

  ngOnInit() {
    return
  }

}
