import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss'],
})
export class AccountMenuComponent  implements OnInit {

  constructor(
    private authService : AuthService,
    private router: Router,
    private loader: LoaderService) { }

  ngOnInit() {}

  signOut(){
    this.loader.presentLoading();
    this.authService.signOut().then(() => {
      this.loader.dismissLoading();
      this.router.navigate(['/login']); // Navigate to login page after logout
    }, (error) => {
      this.loader.dismissLoading();
    });
  }

}
