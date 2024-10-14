import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isSignIn : boolean = true;
  email: string = '';
  password: string = '';
  confPassword: string = '';

  constructor(
    private navCtrl : NavController,
    private authService: AuthService,
    private loader: LoaderService) { }

  ngOnInit() {
  }

  toggleSignIn(){
    this.isSignIn = !this.isSignIn;
  }

  onSubmit(){
    if(this.isSignIn) {
      this.onSignIn();
    } else {
      this.onSignUp();
    }
  }

  onSignUp(){
    if(!this.email || !this.password){
      return;
    }

    this.authService.signUp(this.email, this.password)
      .then(res => {
        console.log('Registered successfully!', res);
        this.navCtrl.navigateForward('/sd/home'); // Navigate to the home page
      })
      .catch(err => {
        console.error('Registration failed', err);
      });
  }

  onSignIn() {
    if(!this.email || !this.password){
      return;
    }

    this.loader.presentLoading();
    this.authService.signIn(this.email, this.password)
      .then(res => {
        this.loader.dismissLoading();
        console.log('Logged in successfully!', res);
        this.navCtrl.navigateForward('/sd/home'); // Navigate to the home page
      })
      .catch(err => {
        this.loader.dismissLoading();
        console.error('Login failed', err);
      });
  }

}
