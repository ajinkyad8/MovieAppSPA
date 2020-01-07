import { Component, OnInit, TemplateRef } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MovieService } from 'src/app/services/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { RoleType } from 'src/app/models/roleType';
import { RoleTypeService } from 'src/app/services/roleType.service';
import { MovieRoleService } from 'src/app/services/movieRole.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {
  id: number;
  movie: Movie;
  movieToSave: Movie;
  movieForm: FormGroup;
  modalRef: BsModalRef;
  roleTypes: RoleType[];
  movieRoles = [];
  seperatedMovieRoles = [];
  artists = [];
  movieRoleToAdd: any = {};

  constructor(private movieService: MovieService, private formBuilder: FormBuilder, private route: ActivatedRoute,
              private alertService: AlertService, private roleTypeService: RoleTypeService, private router: Router,
              private authenticationService: AuthenticationService, private userService: UserService) { }

  ngOnInit() {
    this.createForm();
    this.route.queryParams.subscribe(params => {
        this.id = params.id;
        if (this.id) {
          this.movieService.getMovie(this.id).subscribe(
            res => {
              this.movie = res;
              this.createForm();
              this.seperateMovieRoles();
            },
            error => {
              this.alertService.danger(error);
            }
          );
        }
      });
  }

  createForm() {
    this.movieForm = this.formBuilder.group({
      name: [this.movie ? this.movie.name : '', Validators.required],
      runtime: [this.movie ? this.movie.runtime : '', [Validators.required, Validators.min(0)]],
      plotSummary: [this.movie ? this.movie.plotSummary : '', Validators.required],
      releaseDate: [this.movie ? (new Date(this.movie.releaseDate)).toLocaleDateString() : '', Validators.required],
      country: [this.movie ? this.movie.country : '', Validators.required],
      language: [this.movie ? this.movie.language : '', Validators.required],
      genre: [this.movie ? this.movie.genre : '', Validators.required]
    });
  }

  save() {
    if (this.movieForm.valid) {
      if (this.movie) {
        this.movieService.updateMovie(this.getChangedValues(this.movie.id)).subscribe((res: Movie) => {
          this.movie = res;
          if (!this.movie.isApproved) {
          this.alertService.success('Successfully updated the entry');
          } else {
            this.alertService.success('Your changes have been submitted for approval. A moderator will review them shortly.');
          }
          this.movieForm.markAsPristine();
        }, error => {
          this.alertService.danger(error);
        });
      } else {
        this.movieToSave = Object.assign({}, this.movieForm.value);
        this.movieToSave.releaseDate = this.getUtcDate(this.movieToSave.releaseDate);
        this.movieService.createMovie(this.movieToSave).subscribe((res: Movie) => {
        this.movie = res;
        this.seperateMovieRoles();
        this.alertService.success('Sucesfully saved the entry. A moderator shall soon review it.');
        this.movieForm.markAsPristine();
      }, error => {
        this.alertService.danger(error);
      });
    }
  }
  }

  seperateMovieRoles() {
    if (this.movie) {
    this.movieRoles = this.movie.movieRoles;
    if (!this.movieRoles) {
      this.movieRoles = [];
    }
    }
    this.roleTypeService.getRoleTypes().subscribe(res => {
      this.roleTypes = res;
      for (let j = 0; j < this.roleTypes.length ; j++) {
        this.movieRoleToAdd.roleType = this.roleTypes[j];
        if (this.movie) {
        for (let i = 0; i < this.movieRoles.length ; i++) {
        if (this.roleTypes[j].roleName === this.movieRoles[i].roleType.roleName) {
          this.artists.push(this.movieRoles[i]);
          this.movieRoles.splice(i, 1);
          i--;
        }
      }
    }
        this.movieRoleToAdd.artists = this.artists;
        this.artists = [];
        this.seperatedMovieRoles.push(this.movieRoleToAdd);
        this.movieRoleToAdd = {};
    }
    });
  }

  changeDisplayPicture(url: string) {
    this.movie.photoUrl = url;
  }

  getChangedValues(id: number) {
    const changedValues: any = {};
    if (this.movie.isApproved) {
      changedValues.isMovieApproved = true;
    }
    changedValues.MovieId = id;
    Object.keys(this.movieForm.controls).forEach(c => {
    const currentControl = this.movieForm.get(c);

    if (currentControl.dirty) {
      changedValues[c] = currentControl.value;
      if (c === 'releaseDate') {
        changedValues[c] = this.getUtcDate(currentControl.value);
      }
    }
  });
    return changedValues;
  }

  deleteMovie() {
    if (this.movie.isApproved) {
      this.alertService.confirmDelete('Are you sure you want to delete this movie?').then(res => {
        if (res.response) {
          const request: any = {};
          request.reason = res.reason;
          request.userId = this.authenticationService.decodedToken.nameid;
          request.movieId = this.movie.id;
          this.movieService.deleteMovie(this.movie.id, request).subscribe(() => {
            this.alertService.success('Your request to delete this movie has been placed. A moderator shall soon review it.');
          }, error => {
            this.alertService.danger(error);
          });
        }
      });
    } else {
      this.alertService.confirmDelete('Are you sure you want to delete this movie?', true).then(res => {
        if (res.response) {
          this.userService.deletePendingMovie(this.authenticationService.decodedToken.nameid, this.movie.id).subscribe(() => {
            this.alertService.success('Successfully deleted the movie');
            this.router.navigate(['movies']);
          }, error => {
            this.alertService.danger(error);
          });
        }
      });
    }
  }

  getUtcDate(date: Date): Date {
    const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    return utcDate;
  }

}
