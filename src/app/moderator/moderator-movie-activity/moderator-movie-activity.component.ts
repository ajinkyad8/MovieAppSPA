import { Component, OnInit, Input } from '@angular/core';
import { ModeratorService } from 'src/app/services/moderator.service';
import { AlertService } from 'src/app/services/alert.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-moderator-movie-activity',
  templateUrl: './moderator-movie-activity.component.html',
  styleUrls: ['./moderator-movie-activity.component.css']
})
export class ModeratorMovieActivityComponent implements OnInit {
  @Input() activity: any = [];

  constructor(private moderatorService: ModeratorService, private alertService: AlertService, private movieService: MovieService) { }

  ngOnInit() { }

  getActivities() {
    this.moderatorService.getMovieActivityLogToReview().subscribe(res => {
      this.activity = res;
      this.activity.forEach(element => {
        this.movieService.getMovie(element.movieId).subscribe(movie => {
          element.savedMovie = movie;
        });
      });
    });
  }

  reviewActivity(id, isApproved) {
    this.moderatorService.reviewMovieActivity(id, isApproved).subscribe(() => {
      this.alertService.success('Successfully reviewed the activity');
      this.getActivities();
    }, error => {
      this.alertService.danger(error);
    });
  }
}
