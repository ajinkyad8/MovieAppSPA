import { Component, OnInit, Input } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-user-movie-list',
  templateUrl: './user-movie-list.component.html',
  styleUrls: ['./user-movie-list.component.css']
})
export class UserMovieListComponent implements OnInit {
  @Input() movies: Movie[];

  constructor(private authenticationService: AuthenticationService, private userService: UserService,
              private alertService: AlertService) { }

  ngOnInit() {
  }

  delete(movieId: number, i) {
    event.stopPropagation();
    this.alertService.confirmDelete('Are you sure you want to delete this movie?', true).then(res => {
      if (res.response) {
        this.userService.deletePendingMovie(this.authenticationService.decodedToken.nameid, movieId).subscribe(() => {
          this.alertService.success('Successfully deleted the movie');
          this.movies.splice(i, 1);
        }, error => {
          this.alertService.danger(error);
        });
      }
    });
  }

}
