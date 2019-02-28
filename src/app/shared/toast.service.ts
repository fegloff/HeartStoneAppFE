import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

/*
 * Becuase we are using the Toast as a Service, it requires 
 * @Injectable instead of @Component
*/
@Injectable({
  providedIn: 'root',
  
})

export class ToastService {

  constructor(public toastController: ToastController) {}

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your settings have been saved.',
      duration: 2000
    });
    toast.present();
  }

  async presentToastWithMessage(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 4000
    });
    toast.present();
  }

  async presentErrorToast(message: string) {
    const toast = await this.toastController.create({
      cssClass: 'toastError',
      message,
      position: 'top',
      duration: 3000 //3 secs      
    });
    toast.present();
  }

}