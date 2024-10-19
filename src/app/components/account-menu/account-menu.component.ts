import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { map, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss'],
})
export class AccountMenuComponent  implements OnInit {
  isAuthenticated : boolean = false;
  constructor(
    private authService : AuthService,
    private navCtrl: NavController,
    private loader: LoaderService,
    private common: CommonService) { }

  ngOnInit() {
    this.authService.isAuthenticated().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    })
  }

  signIn(){
    this.navCtrl.navigateForward(['/login']);
  }

  signOut(){
    this.loader.presentLoading();
    this.authService.signOut().then(() => {
      this.loader.dismissLoading();
      this.navCtrl.navigateForward(['/login']);
    }, (error) => {
      this.loader.dismissLoading();
    });
  }

  onProfileClick(){
    this.navCtrl.navigateForward('/profile');
  }

}
