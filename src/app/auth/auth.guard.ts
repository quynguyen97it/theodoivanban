
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkLogin(route, url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  checkLogin(route: ActivatedRouteSnapshot, url: string):boolean {
    if (this.authService.isLoggedIn()) {
      const userRole = this.authService.getRole();
      var status = 0;
      for(let i=0; i<route.data[0].length;i++){
        if (route.data[0][i] == userRole) {
          status = 1;
        }
      }

      if(status == 0){
        this.authService.logout()
        this.router.navigate(['**']);
        return false;
      }

      return true;
    }

    this.authService.redirectUrl = url;
    //this.router.navigate(['/login'], {queryParams: { returnUrl: url }} );
    this.router.navigate(['/login']);
    return false;
  }
}
