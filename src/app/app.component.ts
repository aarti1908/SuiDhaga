import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { filter, map, take } from 'rxjs';
import { CommonService } from './services/common.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private common: CommonService
  ) { }
}
