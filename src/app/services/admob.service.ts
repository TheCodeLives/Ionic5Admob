import { Injectable } from '@angular/core';
//IMPORTAMOS PLATFORM PARA PODER ARRANCAR ADMOB CUANDO LA APLICACION ESTE LISTA.
import { Platform } from '@ionic/angular';
//IMPORTAMOS LO QUE VAMOS A UTILIZAR DE ADMOB.
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free/ngx';


@Injectable({
  providedIn: 'root'
})
export class AdmobService {

  //CONFIGURACION DEL BANNER
  bannerConfig: AdMobFreeBannerConfig = {
    isTesting: true, // DURANTE DEL DESARROLLO
    autoShow: true//,
    //id: "ID GENERADO EN ADMOB ca-app-pub"
  };

  //CONFIGURACION DEL INTERSTITIAL
  interstitialConfig: AdMobFreeInterstitialConfig = {    
    isTesting: true, // DURANTE DEL DESARROLLO
    autoShow: false,
    //id: "ID GENERADO EN ADMOB ca-app-pub"
  };
 
  //CONFIGURACION DEL REWARD VIDEO.
  RewardVideoConfig: AdMobFreeRewardVideoConfig = {
    isTesting: true, // DURANTE DEL DESARROLLO
    autoShow: false//,
    //id: "ID GENERADO EN ADMOB ca-app-pub"
  };
 
  //AÑADIR PLATFORM Y ADMOB EN NUESTRO CONSTRUCTOR.
  constructor(
    public platform: Platform,
    private admobFree: AdMobFree    
  ) {
      //CARGAMOS LOS ANUNCIOS DURANTE EL INICIO DE LA APP CON LA PROMESA DE platform.ready
      platform.ready().then(()=>{
        //BANNER
        this.admobFree.banner.config(this.bannerConfig); 

        //INTERSTITIAL
        this.admobFree.interstitial.config(this.interstitialConfig);      
        this.admobFree.interstitial.prepare().then(() => {          
            console.log('INTERSTIAL CARGADO CORRECTAMENTE')
          }).catch(e => 
            console.log('PROBLEMA CARGANDO INTERSTITIAL: ', e)              
          );
  
        //REWARD VIDEO
        this.admobFree.rewardVideo.config(this.RewardVideoConfig);      
        this.admobFree.rewardVideo.prepare().then(() => {          
          console.log('REWARD VIDEO CARGADO CORRECTAMENTE')
        }).catch(e => 
          console.log('PROBLEMA CARGANDO REWARDVIDEO: ', e)              
        );
    });
  }


  MostrarBanner() {    
    //COMPROBAR Y MOSTRAR EL BANNER
    this.admobFree.banner.prepare().then(() => {
      console.log('BANNER CARGADO CORRECTAMENTE')
    }).catch(e => 
      console.log('PROBLEMA CARGANDO BANNER: ', e)              
    );
  }

  MostrarInterstitial() {
    //COMPROBAR QUE EL INTERSTITIAL ESTA LISTO
    this.admobFree.interstitial.isReady().then(() => {
      //SI ESTA LISTO MOSTRAR ANUNCIO
      this.admobFree.interstitial.show().then(() => {
        console.log('INTERSTITIAL CARGADO CORRECTAMENTE')
      })
        .catch(e => console.log('PROBLEMA MOSTRANDO REWARD VIDEO: ', e)  );
    })
      .catch(e => console.log('PROBLEMA CARGANDO REWARD VIDEO: ', e)  );
  }

  MostrarRewardVideo() {
    //COMPROBAR QUE EL REWARDVIDEO ESTA LISTO
    this.admobFree.rewardVideo.isReady().then(() => {
      //SI ESTA LISTO MOSTRAR ANUNCIO
      this.admobFree.rewardVideo.show().then(() => {
        console.log('BANNER CARGADO CORRECTAMENTE')
      })
        .catch(e => console.log('PROBLEMA MOSTRANDO REWARD VIDEO: ', e)  );
    })
      .catch(e => console.log('PROBLEMA CARGANDO REWARD VIDEO: ', e)  );
  }
}
