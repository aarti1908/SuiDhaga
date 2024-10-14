import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  name: string = '';
  experience : number | null = null;
  location : Object = [];
  mobile : number | null = null;

  constructor(private userService: UsersService) { }

  ngOnInit() {
  }

  onSubmit(){
    const user = {
      name: this.name,
      experience :this.experience,
      location : this.location,
      mobile : this.mobile
    }
    this.userService.addUser(user).then(data => {
      console.log(data)
    });
  }
}
