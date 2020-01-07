import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertService } from 'src/app/services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any = {};
  redirectUrl: string;

  constructor(private authenticationService: AuthenticationService, private alertService: AlertService, private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
  }

  login() {
    const params = this.route.snapshot.queryParams;
    if (params.redirectUrl) {
        this.redirectUrl = params.redirectUrl;
    }

    this.authenticationService.$user.subscribe(data => {
    });
    this.authenticationService.login(this.user).subscribe(() => {
      this.alertService.success('Successfully logged in');
      if (this.redirectUrl) {
        this.router.navigateByUrl(this.redirectUrl, )
            .catch(() => this.router.navigate(['home']));
    } else {

        this.router.navigate(['home']);
    }
    }, error => {
      this.alertService.danger('Invalid username or password.');
    });
  }

  register() {
    const redirectUrl = this.route.snapshot.queryParams.redirectUrl;
    if (redirectUrl) {
      this.router.navigate(['auth/register'], {queryParams: {redirectUrl}});
    } else {
      this.router.navigate(['auth/register']);
    }
  }

}
