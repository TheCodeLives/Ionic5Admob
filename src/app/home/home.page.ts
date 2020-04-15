import { Component, OnInit } from '@angular/core';

//IMPORTAMOS NUESTRO SERVICIO
import { AdmobService } from '../services/admob.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    //AÑADIMOS AL CONSTRUCTOR.
    private admobService: AdmobService,
  ) {}
  
  ngOnInit() {
    //AL CARGAR LA PAGINA MOSTRAMOS BANNER
    this.admobService.MostrarBanner();
  }

  //FUNCION PARA LLAMAR AL INTERSTITIAL
  MostrarInterstitial(){
    this.admobService.MostrarInterstitial();    
  }

  //FUNCION PARA LLAMAR AL VIDEOREWARD
  MostrarReward(){
    this.admobService.MostrarRewardVideo();
  }
}
