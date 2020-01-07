import { Component, OnInit, Input } from '@angular/core';
import { MovieRole } from 'src/app/models/movieRole';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-user-movie-role',
  templateUrl: './user-movie-role.component.html',
  styleUrls: ['./user-movie-role.component.css']
})
export class UserMovieRoleComponent implements OnInit {
  @Input() movieRoles: [];

  constructor(private userService: UserService, private alertService: AlertService,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  delete(roleId: number, i) {
    this.alertService.confirmDelete('Are you sure you want to delete this movie role?', true).then(res => {
      if (res.response) {
        this.userService.deletePendingMovieRole(this.authenticationService.decodedToken.nameid, roleId).subscribe(() => {
          this.alertService.success('Successfully deleted movie role');
          this.movieRoles.splice(i, 1);
        }, error => {
          this.alertService.danger(error);
        });
      }
    });
  }

}
