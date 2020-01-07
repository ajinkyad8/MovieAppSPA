import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertService } from 'src/app/services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  genders = ['Male', 'Female', 'Non-Binary'];
  user: any = {};
  dateOfBirth = new Date();
  gender = 'male';
  redirectUrl: string;

  constructor(private authenticationService: AuthenticationService, private alertService: AlertService, private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.user.gender = 'Male';
  }

  register() {
    const params = this.route.snapshot.queryParams;
    if (params) {
        this.redirectUrl = params.redirectUrl;
    }
    this.user.dateOfBirth = new Date(Date.UTC(this.user.dateOfBirth.getFullYear(), this.user.dateOfBirth.getMonth(),
    this.user.dateOfBirth.getDate()));
    this.authenticationService.register(this.user).subscribe(() => {
      this.alertService.success('Registered Successfuly');
    }, error => {
      this.alertService.danger(error);
    }, () => {
      this.authenticationService.login(this.user).subscribe(() => {
        if (this.redirectUrl) {
        this.router.navigateByUrl(this.redirectUrl)
            .catch(() => this.router.navigate(['home']));
    } else {
        this.router.navigate(['home']);
    }
    });
  });
  }

}
