import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  canActivate(route: ActivatedRouteSnapshot):boolean {
      const currentUser = this.authService.currentUserValue;
      console.log('currentUser', currentUser)
      if(currentUser){
        // const adminRole = route.data.roles[0]
        // const userRole = route.data.roles[1]
        if (
          route.data.roles &&
          route.data.roles.indexOf(currentUser.role) === -1
        ) {
          console.log('Roles', route.data.roles)
          this.router.navigate(['/']);
          return false;
        }
        return true;
      }
    this.router.navigate(['/'])
    return false;
    
  }
  
}
