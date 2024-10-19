import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

interface User {
  email : string,
  password : string
}
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isSignIn : boolean = true;
  userForm = this.fb.group({
    name: ['', []],
    email: ['', [Validators.required, this.customEmailValidator()]],
    password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator()]],
    confPassword: ['', []],
    roleId: ['', []],
  });

  constructor(
    private navCtrl : NavController,
    private authService: AuthService,
    private loader: LoaderService,
    private fb: FormBuilder) { }

  ngOnInit() {
  }

  customEmailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const value = control.value;
      if (!value) return null;
      return pattern.test(value) ? null : { emailPattern: true };
    }
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.value;
      if(!password) return null;
      const hasUpperCase = /[A-Z]/.test(password);
      const hasNumeric = /[0-9]/.test(password);
      const validLength = password.length >= 8;
      const passwordValid = hasUpperCase && hasNumeric && validLength;
      return !passwordValid ? { passwordStrength: true } : null;
    }
  }

  toggleSignIn(){
    this.isSignIn = !this.isSignIn;
    if(!this.isSignIn){
      this.userForm = this.fb.group({
        name: ['', [ Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, this.customEmailValidator()]],
        password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator()]],
        confPassword: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]],
        roleId: ['', [Validators.required]],
      });
    }
  }

  onSubmit(){
    if(this.isSignIn) {
      this.onSignIn();
    } else {
      this.onSignUp();
    }
  }

  onSignUp(){
    if(!this.userForm.valid){
      return;
    }

    const user : User = {
      email : this.userForm.get('email')?.value ?? '',
      password : this.userForm.get('password')?.value ?? '',
    }

    const additionalData = {
      email: user.email,
      name : this.userForm.get('name')?.value,
      roleId : this.userForm.get('roleId')?.value
    }

    this.authService.signUp(user.email, user.password, additionalData)
      .then(res => {
        console.log('Registered successfully!', res);
        this.userForm.reset();
        this.navCtrl.navigateForward('/sd/home'); // Navigate to the home page
      })
      .catch(err => {
        console.error('Registration failed', err);
      });
  }

  onSignIn() {
    if(!this.userForm.valid){
      return;
    }

    const user : User = {
      email : this.userForm.get('email')?.value ?? '',
      password : this.userForm.get('password')?.value ?? '',
    }

    this.loader.presentLoading();
    this.authService.signIn(user.email, user.password)
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
