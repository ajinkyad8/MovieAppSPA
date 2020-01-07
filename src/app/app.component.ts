import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  jwtHelper = new JwtHelperService();

  constructor(private authenticationService: AuthenticationService, private title: Title) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authenticationService.decodedToken = this.jwtHelper.decodeToken(token);
      const userName = this.authenticationService.decodedToken.unique_name;
      const roles = this.authenticationService.decodedToken.role;
      this.authenticationService.user.next(userName);
      this.authenticationService.roles.next(roles);
    }
    this.title.setTitle('MovieZone');
  }
}
