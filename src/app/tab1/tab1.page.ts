import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  users : any;

  constructor(
    public userService: UsersService,
    private navCtrl : NavController
  ) {
    this.userService.getAllProviders().subscribe(data => {
      this.users = data;
    })
  }

  view(user : any){
    this.navCtrl.navigateForward('/posts');
  }
}
