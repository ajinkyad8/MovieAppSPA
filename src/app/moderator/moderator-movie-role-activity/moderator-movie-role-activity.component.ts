import { Component, OnInit, Input } from '@angular/core';
import { ModeratorService } from 'src/app/services/moderator.service';
import { AlertService } from 'src/app/services/alert.service';
import { MovieRoleService } from 'src/app/services/movieRole.service';

@Component({
  selector: 'app-moderator-movie-role-activity',
  templateUrl: './moderator-movie-role-activity.component.html',
  styleUrls: ['./moderator-movie-role-activity.component.css']
})
export class ModeratorMovieRoleActivityComponent implements OnInit {
  @Input() activity: any = [];

  constructor(private moderatorService: ModeratorService, private alertService: AlertService,
              private movieRoleService: MovieRoleService) { }

  ngOnInit() { }

  getActivities() {
    this.moderatorService.getMovieRoleActivityToReview().subscribe(res => {
      this.activity = res;
      this.activity.forEach(element => {
        this.movieRoleService.getMovieRole(element.movieRoleId).subscribe(movieRole => {
          element.savedRole = movieRole;
        });
      });
    });
  }

  reviewActivity(id, isApproved) {
    this.moderatorService.reviewMovieRoleActivity(id, isApproved).subscribe(() => {
      this.alertService.success('Successfully reviewed the activity');
      this.getActivities();
    }, error => {
      this.alertService.danger(error);
    });
  }
}
