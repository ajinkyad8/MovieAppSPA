import { Component, OnInit, Input } from '@angular/core';
import { MovieRole } from 'src/app/models/movieRole';
import { ModeratorService } from 'src/app/services/moderator.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-moderator-movie-role',
  templateUrl: './moderator-movie-role.component.html',
  styleUrls: ['./moderator-movie-role.component.css']
})
export class ModeratorMovieRoleComponent implements OnInit {
  @Input() movieRoles: any = [];

  constructor(private moderatorService: ModeratorService, private alertService: AlertService) { }

  ngOnInit() { }

  getMovieRoles() {
    this.moderatorService.getMovieRolesToReview().subscribe(res => {
      this.movieRoles = res;
    });
  }

  reviewMovieRole(movieRole, review, i) {
    this.moderatorService.reviewMovieRole(movieRole.id, review).subscribe(() => {
      this.movieRoles.splice(i, 1);
      this.getMovieRoles();
      this.alertService.success('Successfully reviewed the movie role');
    }, error => {
      this.alertService.danger(error);
    });
  }

}
