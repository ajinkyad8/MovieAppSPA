import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Artist } from 'src/app/models/artist';
import { MovieRole } from 'src/app/models/movieRole';
import { MovieService } from 'src/app/services/movie.service';
import { ArtistService } from 'src/app/services/artist.service';
import { MovieRoleService } from 'src/app/services/movieRole.service';

@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.css']
})
export class UserMainComponent implements OnInit {
  movies: Movie[];
  artists: Artist[];
  movieRoles: any = [];
  movieActivity: any = [];
  artistActivity: any = [];
  movieRoleActivity: any = [];
  artistPhotos: any = [];
  moviePhotos: any = [];
  id: number;
  artistsPending = false;
  artistPhotosPending = false;
  artistActivityPending = false;
  moviesPending = false;
  movieActivityPending = false;
  moviePhotosPending = false;
  movieRolesPending = false;
  movieRoleActivityPending = false;
  constructor(private userService: UserService, private authenticationService: AuthenticationService,
              private movieService: MovieService, private artistService: ArtistService, private movieRoleService: MovieRoleService) { }

  ngOnInit() {
    this.id = this.authenticationService.decodedToken.nameid;
    this.getUserMovies();
  }

  getUserMovies() {
    this.userService.getUserMovies(this.id).subscribe(res => {
      this.movies = res;
      this.moviesPending = false;
    });
  }

  getUserPendingMovies() {
    this.userService.getUserPendingMovies(this.id).subscribe(res => {
      this.movies = res;
      this.moviesPending = true;
    });
  }

  getUserArtists() {
    this.userService.getUserArtists(this.id).subscribe(res => {
      this.artists = res;
      this.artistsPending = false;
    });
  }

  getUserPendingArtists() {
    this.userService.getUserPendingArtists(this.id).subscribe(res => {
      this.artists = res;
      this.artistsPending = true;
    });
  }

  getUserMovieRoles() {
    this.userService.getUserMovieRoles(this.id).subscribe(res => {
      this.movieRoles = res;
      this.movieRolesPending = false;
    });
  }

  getUserPendingMovieRoles() {
    this.userService.getUserPendingMovieRoles(this.id).subscribe(res => {
      this.movieRoles = res;
      this.movieRolesPending = true;
    });
  }

  getUserMovieActivity() {
    this.userService.getUserMovieActivity(this.id).subscribe(res => {
      this.movieActivity = res;
      this.movieActivityPending = false;
      this.movieActivity.forEach(element => {
        this.movieService.getMovie(element.movieId).subscribe(result => {
          const savedMovie = result;
          element.savedMovie = savedMovie;
        });
      });
    });
  }

  getUserPendingMovieActivity() {
    this.userService.getUserPendingMovieActivity(this.id).subscribe(res => {
      this.movieActivity = res;
      this.movieActivityPending = true;
      this.movieActivity.forEach(element => {
        this.movieService.getMovie(element.movieId).subscribe(result => {
          const savedMovie = result;
          element.savedMovie = savedMovie;
        });
      });
    });
  }

  getUserArtistActivity() {
    this.userService.getUserArtistActivity(this.id).subscribe(res => {
      this.artistActivity = res;
      this.artistActivityPending = false;
      this.artistActivity.forEach(element => {
        this.artistService.getArtist(element.artistId).subscribe(result => {
          const savedArtist = result;
          element.savedArtist = savedArtist;
        });
      });
    });
  }

  getUserPendingArtistActivity() {
    this.userService.getUserPendingArtistActivity(this.id).subscribe(res => {
      this.artistActivity = res;
      this.artistActivityPending = true;
      this.artistActivity.forEach(element => {
        this.artistService.getArtist(element.artistId).subscribe(result => {
          const savedArtist = result;
          element.savedArtist = savedArtist;
        });
      });
    });
  }

  getUserPendingMovieRoleActivity() {
    this.userService.getUserPendingMovieRoleActivity(this.id).subscribe(res => {
      this.movieRoleActivity = res;
      this.movieRoleActivityPending = true;
      this.movieRoleActivity.forEach(element => {
        this.movieRoleService.getMovieRole(element.movieRoleId).subscribe(result => {
          const savedRole = result;
          element.savedRole = savedRole;
        }, error => {});
      });
    });
  }

  getUserMovieRoleActivity() {
    this.userService.getUserMovieRoleActivity(this.id).subscribe(res => {
      this.movieRoleActivity = res;
      this.movieRoleActivityPending = false;
      this.movieRoleActivity.forEach(element => {
        this.movieRoleService.getMovieRole(element.movieRoleId).subscribe(result => {
          const savedRole = result;
          element.savedRole = savedRole;
        });
      });
    });
  }

  getUserArtistPhotos() {
    this.userService.getUserArtistPhotos(this.id).subscribe(res => {
      this.artistPhotos = res;
      this.artistPhotosPending = false;
    });
  }

  getUserPendingArtistPhotos() {
    this.userService.getUserPendingArtistPhotos(this.id).subscribe(res => {
      this.artistPhotos = res;
      this.artistPhotosPending = true;
    });
  }

  getUserMoviePhotos() {
    this.userService.getUserMoviePhotos(this.id).subscribe(res => {
      this.moviePhotos = res;
      this.moviePhotosPending = false;
    });
  }

  getUserPendingMoviePhotos() {
    this.userService.getUserPendingMoviePhotos(this.id).subscribe(res => {
      this.moviePhotos = res;
      this.moviePhotosPending = true;
    });
  }

  clearMovies() {
    this.movies.length = 0;
  }

  clearArtists() {
    this.artists.length = 0;
  }

  clearMovieRoles() {
    this.movieRoles.length = 0;
  }

  clearMovieActivity() {
    this.movieActivity.length = 0;
  }

  clearArtistActivity() {
    this.artistActivity.length = 0;
  }

  clearMovieRoleActivity() {
    this.movieRoleActivity.length = 0;
  }

  clearArtistPhotos() {
    this.artistPhotos.length = 0;
  }

  clearMoviePhotos() {
    this.moviePhotos.length = 0;
  }

}
