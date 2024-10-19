import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class CommonService {
  private userRole :  number = 1;
  private isAuthenticated : boolean = false;

  constructor(){

  }

  setAuthFlag(value: boolean){
    console.log('setting auth : ' + value)
    this.isAuthenticated = value;
  }

  getAuthFlag(){
    return this.isAuthenticated;
  }

  setUserRole(id :  number){
    this.userRole = id;
  }

  getUserRole(){
    return this.userRole;
  }
}
