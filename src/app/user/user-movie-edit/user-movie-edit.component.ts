import { Component, OnInit, Input } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-user-movie-edit',
  templateUrl: './user-movie-edit.component.html',
  styleUrls: ['./user-movie-edit.component.css']
})
export class UserMovieEditComponent implements OnInit {
  @Input() movieActivity: any;

  constructor(private userService: UserService, private authenticationService: AuthenticationService,
              private alertService: AlertService) { }

  ngOnInit() {
  }

  delete(activityId, i) {
    this.alertService.confirmDelete('Are you sure you want to delete this edit?', true).then(res => {
      if (res.response) {
        this.userService.deletePendingMovieActivity(this.authenticationService.decodedToken.nameid, activityId).subscribe(() => {
          this.alertService.success('Successfully removed the edit request');
          this.movieActivity.splice(i, 1);
        }, error => {
          this.alertService.danger(error);
        });
      }
    });
  }

}
