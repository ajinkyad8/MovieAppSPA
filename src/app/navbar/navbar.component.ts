import { Component, OnInit } from '@angular/core';
import { AlertService } from '../services/alert.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: any;
  isAdmin = false;
  isModerator = false;

  constructor(private alertService: AlertService, private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.authenticationService.$user.subscribe(name => {
      this.user = name;
    });
    this.authenticationService.$roles.subscribe(roles => {
      if (roles && roles.includes('Admin')) {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
      if (roles && roles.includes('Moderator')) {
        this.isModerator = true;
      } else {
        this.isModerator = false;
      }
    });
  }

  loggedIn() {
    return this.authenticationService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.alertService.success('Logged Out Successfully');
    this.isAdmin = false;
    this.isModerator = false;
    this.router.navigate(['home']);
  }

}
