import { Component, OnInit, Input } from '@angular/core';
import { RoleType } from 'src/app/models/roleType';
import { Artist } from 'src/app/models/artist';
import { ArtistService } from 'src/app/services/artist.service';
import { MovieRole } from 'src/app/models/movieRole';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/models/movie';
import { MovieRoleService } from 'src/app/services/movieRole.service';
import { AlertService } from 'src/app/services/alert.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { MovieEditMovieRoleComponent } from '../movie-edit-movie-role/movie-edit-movie-role.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-movie-edit-card-deck',
  templateUrl: './movie-edit-card-deck.component.html',
  styleUrls: ['./movie-edit-card-deck.component.css']
})
export class MovieEditCardDeckComponent implements OnInit {
  @Input() roleType: RoleType;
  @Input() movie: Movie;
  @Input() movieRoles: MovieRole[];
  artists: Artist[];
  movieRolesAdded = [];
  movieArtist: any = {};
  bsModalRef: BsModalRef;
  pageNumber = 1;
  pageSize = 6;
  totalItems: number;
  search: string;
  constructor(private artistService: ArtistService, private authenticationService: AuthenticationService,
              private movieRoleService: MovieRoleService, private alertService: AlertService, private modalService: BsModalService,
              private userService: UserService) { }

  ngOnInit() {
    this.getArtists();
    if (this.movie) {
      this.movieRolesAdded = this.movieRoles;
    }
    this.movieRoleService.$movieRoleSource.subscribe((res: MovieRole) => {
      if (res.roleType.roleName === this.roleType.roleName) {
        this.movieRolesAdded.push(res);
      }
    });
  }

  getArtists() {
    this.artistService.getArtists(this.pageNumber, this.pageSize, this.search).subscribe(res => {
      this.artists = res.data;
      this.totalItems = res.pagination.totalItems;
    });
  }
  pageChanged(event) {
    this.pageNumber = event.page;
    this.getArtists();
  }

  edit(movieRole) {
    const initialState = {
      movieRole
    };
    this.bsModalRef = this.modalService.show(MovieEditMovieRoleComponent, {initialState});
  }

  delete(movieRole, i) {
    if (movieRole.isApproved) {
      this.alertService.confirmDelete('Are you sure you want to delete this movie role?').then(res => {
        if (res.response) {
          const req: any = {};
          req.userId = this.authenticationService.decodedToken.nameid;
          req.movieRoleId = movieRole.id;
          req.reason = res.reason;
          this.movieRoleService.deleteMovieRole(movieRole.id, req).subscribe(() => {
            this.alertService.success('Your request to delete this movie role has been placed. A moderator shall soon review it');
          }, error => {
            this.alertService.danger(error);
          });
        }
      });
    } else {
      this.alertService.confirmDelete('Are you sure you want to delete this movie role?', true).then(res => {
        if (res.response) {
          this.userService.deletePendingMovieRole(this.authenticationService.decodedToken.nameid, movieRole.id).subscribe(() => {
            this.alertService.success('Successfully deleted the movie role');
            this.movieRoles.splice(i, 1);
          }, error => {
            this.alertService.danger(error);
          });
        }
      });
    }
}
}

