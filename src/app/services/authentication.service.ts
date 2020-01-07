import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl = environment.baseUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  user = new BehaviorSubject<string>(null);
  $user = this.user.asObservable();
  roles = new BehaviorSubject<string[]>(null);
  $roles = this.roles.asObservable();

constructor(private http: HttpClient) { }

login(user: any) {
  return this.http.post(this.baseUrl + 'login', user).pipe(
    map((response: any) => {
      const userData = response;
      if (userData) {
        localStorage.setItem('token', userData.token);
        this.decodedToken = this.jwtHelper.decodeToken(userData.token);
        if (this.decodedToken) {
        this.user.next(this.decodedToken.unique_name);
        this.roles.next(this.decodedToken.role);
        }
      }
    })
  );
}

register(user: any) {
  return this.http.post(this.baseUrl + 'register', user);
}

loggedIn() {
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}

rolePresent(allowedRoles) {
  let isRolePresent = false;
  const userRoles = this.decodedToken.role;
  if (!userRoles) {
    return isRolePresent;
  }
  allowedRoles.forEach(role => {
    if (userRoles.includes(role)) {
      isRolePresent = true;
    }
  });
  return isRolePresent;
}

}
