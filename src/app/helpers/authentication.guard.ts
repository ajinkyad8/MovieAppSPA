import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { AlertService } from '../services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService, private alertService: AlertService,  private router: Router) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authenticationService.loggedIn()) {
      const allowedRole = next.data.role;
      if (allowedRole) {
        if (this.authenticationService.rolePresent(allowedRole)) {
          return true;
        } else {
          this.alertService.danger('Access Restricted');
          this.router.navigate(['/home']);
        }
      }
      return true;
  }
    this.alertService.danger('You need to log in to access this page');
    this.router.navigate(['auth/login'], {queryParams: {redirectUrl: state.url}});
    return false;
  }

}
