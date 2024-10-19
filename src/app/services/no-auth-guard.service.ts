import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map, Observable, take } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private common: CommonService) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(
      take(1),  // Take the first emitted value (no continuous listening)
      map(isAuthenticated => {
        if (!isAuthenticated) {
          return true;  // If user is authenticated, allow the route to activate
        } else {
          this.router.navigate(['/sd/home']);  // Redirect to login if not authenticated
          return false;
        }
      })
    );
  }
}
