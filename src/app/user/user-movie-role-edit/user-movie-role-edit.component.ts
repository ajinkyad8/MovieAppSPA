import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-user-movie-role-edit',
  templateUrl: './user-movie-role-edit.component.html',
  styleUrls: ['./user-movie-role-edit.component.css']
})
export class UserMovieRoleEditComponent implements OnInit {
  @Input() movieRoleActivity: any;

  constructor(private userService: UserService, private authenticationService: AuthenticationService,
              private alertService: AlertService) { }

  ngOnInit() {
  }

  delete(activityId, i) {
    this.alertService.confirmDelete('Are you sure you want to delete this edit?', true).then(res => {
      if (res.response) {
      this.userService.deletePendingMovieRoleActivity(this.authenticationService.decodedToken.nameid, activityId).subscribe(() => {
        this.alertService.success('Successfully removed the edit request');
        this.movieRoleActivity.splice(i, 1);
      }, error => {
        this.alertService.danger(error);
      });
      }
    });
  }

}
