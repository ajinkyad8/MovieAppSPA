import { Component, OnInit, Input } from '@angular/core';
import { ModeratorService } from 'src/app/services/moderator.service';
import { Movie } from 'src/app/models/movie';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-moderator-movie',
  templateUrl: './moderator-movie.component.html',
  styleUrls: ['./moderator-movie.component.css']
})
export class ModeratorMovieComponent implements OnInit {
  @Input() movies: any = [];

  constructor(private moderatorService: ModeratorService, private alertService: AlertService) { }

  ngOnInit() { }

  getMovies() {
    this.moderatorService.getMoviesToReview().subscribe(res => {
      this.movies = res;
    });
  }


  review(movie, isApproved) {
    this.moderatorService.reviewMovie(movie.id, isApproved).subscribe(() => {
      this.getMovies();
      this.alertService.success('Successfully reviewed new movie request');
    }, error => {
      this.alertService.danger(error);
    });
  }
}
