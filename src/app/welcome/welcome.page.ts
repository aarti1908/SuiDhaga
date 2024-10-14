import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(private navCtrl : NavController) { }

  ngOnInit() {
  }

  onTailorClick(){
    this.navCtrl.navigateForward('/profile');
  }

  onCustomerClick(){
    this.navCtrl.navigateForward('/tabs/tab1');
  }
}
