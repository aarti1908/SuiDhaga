import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(
    private navCtrl : NavController,
    private common : CommonService
  ) { }

  ngOnInit() {
  }

  onSectionClick(id: number){
    this.common.setUserRole(id);
    if(id == 1 || id == 2){
      this.navCtrl.navigateForward('/sd/home');
    } else {
      this.navCtrl.navigateForward('/login');
    }
  }
}
