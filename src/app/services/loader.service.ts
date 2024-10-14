import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(private loadingController: LoadingController) {}

  async presentLoading() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',         // Spinner style: bubbles, circles, crescent, etc.
      message: 'Loading...',      // Custom message
      duration: 5000,             // Hide after 5 seconds
      translucent: true,          // Semi-transparent background
      cssClass: 'custom-loader',  // Apply custom styles (if needed)
      backdropDismiss: true       // Dismiss when tapping the backdrop
    });
    await loading.present();
  }

  dismissLoading(){
    this.loadingController.dismiss();
  }

}
