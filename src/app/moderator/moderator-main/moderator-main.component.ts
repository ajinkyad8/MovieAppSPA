import { Component, OnInit } from '@angular/core';
import { ModeratorService } from 'src/app/services/moderator.service';
import { Artist } from 'src/app/models/artist';
import { ArtistPhoto } from 'src/app/models/artistPhoto';
import { Movie } from 'src/app/models/movie';
import { MoviePhoto } from 'src/app/models/moviePhoto';
import { MovieRole } from 'src/app/models/movieRole';
import { ArtistService } from 'src/app/services/artist.service';
import { MovieService } from 'src/app/services/movie.service';
import { MovieRoleService } from 'src/app/services/movieRole.service';
import { element } from 'protractor';

@Component({
  selector: 'app-moderator-main',
  templateUrl: './moderator-main.component.html',
  styleUrls: ['./moderator-main.component.css']
})
export class ModeratorMainComponent implements OnInit {
  artists: any = [];
  artistActivity: any = [];
  artistPhotos: any = [];
  movies: any = [];
  movieActivity: any = [];
  moviePhotos: any = [];
  movieRoles: any = [];
  movieRoleActivity: any = [];
  artistDeleteRequests: any = [];
  movieDeleteRequests: any = [];
  movieRoleDeleteRequests: any = [];
  photosWithDeleteRequests: any = [];

  constructor(private moderatorService: ModeratorService, private artistService: ArtistService, private movieService: MovieService,
              private movieRoleService: MovieRoleService) { }

  ngOnInit() {
    this.getMoviesToReview();
  }

  getArtistsToReview() {
    this.moderatorService.getArtistsToReview().subscribe(res => {
      this.artists = res;
    });
  }

  getArtistActivityToReview() {
    this.moderatorService.getArtistActivityLogToReview().subscribe(res => {
      this.artistActivity = res;
      this.artistActivity.forEach(element => {
        this.artistService.getArtist(element.artistId).subscribe(artist => {
          element.savedArtist = artist;
        });
      });
    });
  }

  getMoviesToReview() {
    this.moderatorService.getMoviesToReview().subscribe(res => {
      this.movies = res;
    });
  }

  getMovieActivityToReview() {
    this.moderatorService.getMovieActivityLogToReview().subscribe(res => {
      this.movieActivity = res;
      this.movieActivity.forEach(element => {
        this.movieService.getMovie(element.movieId).subscribe(movie => {
          element.savedMovie = movie;
        });
      });
    });
  }

  getArtistPhotosToReview() {
    this.moderatorService.getArtistPhotosToReview().subscribe(res => {
      this.artistPhotos = res;
    });
  }

  getMoviePhotosToReview() {
    this.moderatorService.getMoviePhotosToReview().subscribe(res => {
      this.moviePhotos = res;
    });
  }

  getMovieRolesToReview() {
    this.moderatorService.getMovieRolesToReview().subscribe(res => {
      this.movieRoles = res;
    });
  }

  getMovieRoleActivity() {
    this.moderatorService.getMovieRoleActivityToReview().subscribe(res => {
      this.movieRoleActivity = res;
      this.movieRoleActivity.forEach(element => {
        this.movieRoleService.getMovieRole(element.movieRoleId).subscribe(movieRole => {
          element.savedRole = movieRole;
        });
      });
    });
  }

  getArtistDeleteRequests() {
    this.moderatorService.getArtistDeleteRequests().subscribe(res => {
      this.artistDeleteRequests = res;
    });
  }

  getMovieDeleteRequests() {
    this.moderatorService.getMovieDeleteRequests().subscribe(res => {
      this.movieDeleteRequests = res;
    });
  }

  getMovieRoleDeleteRequests() {
    this.moderatorService.getMovieRoleDeleteRequests().subscribe(res => {
      this.movieRoleDeleteRequests = res;
    });
  }

  getMoviePhotosWithDeleteRequests() {
    this.moderatorService.getMoviePhotosWithDeleteRequests().subscribe(res => {
      this.photosWithDeleteRequests = res;
    });
  }

  getArtistPhotosWithDeleteRequests() {
    this.moderatorService.getArtistPhotosWithDeleteRequests().subscribe(res => {
      this.photosWithDeleteRequests = res;
    });
  }

}
