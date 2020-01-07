import { Component, OnInit, TemplateRef } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';
import { AlertService } from 'src/app/services/alert.service';
import { ActivatedRoute } from '@angular/router';
import { RoleType } from 'src/app/models/roleType';
import { MovieRole } from 'src/app/models/movieRole';
import { RoleTypeService } from 'src/app/services/roleType.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  id: number;
  movie: Movie;
  seperatedMovieRoles = [];
  movieRoles: MovieRole[];
  roleTypes: RoleType[];
  movieRoleToAdd: any = {};
  movieRolesByType = [];
  firstActivity: any;
  modalRef: BsModalRef;
  movieActivity: any = [];

  constructor(private movieServce: MovieService, private alertService: AlertService, private route: ActivatedRoute,
              private roleTypeService: RoleTypeService, private modalService: BsModalService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(data => {
      this.id = data.id;
    });
    this.movieServce.getMovie(this.id).subscribe(res => {
      this.movie = res;
      this.seperateMovieRoles();
    }, error => {
      this.alertService.danger(error);
    });
  }

  seperateMovieRoles() {
    if (this.movie) {
    this.movieRoles = this.movie.movieRoles;
    this.roleTypeService.getRoleTypes().subscribe(res => {
      this.roleTypes = res;
      for (let j = 0; j < this.roleTypes.length ; j++) {
        this.movieRoleToAdd.roleType = this.roleTypes[j];
        for (let i = 0; i < this.movieRoles.length ; i++) {
        if (this.roleTypes[j].roleName === this.movieRoles[i].roleType.roleName) {
          this.movieRolesByType.push(this.movieRoles[i]);
          this.movieRoles.splice(i, 1);
          i--;
        }
      }
        this.movieRoleToAdd.movieRoles = this.movieRolesByType;
        this.movieRolesByType = [];
        this.seperatedMovieRoles.push(this.movieRoleToAdd);
        this.movieRoleToAdd = {};
    }
    });
    }
  }

  openActivityLog(template: TemplateRef<any>) {
    this.movieServce.getMovieActivityLog(this.movie.id).subscribe(res => {
      this.firstActivity = res[0];
      this.movieActivity = res;
      this.movieActivity.splice(0, 1);
      this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
    }, error => {
      this.alertService.danger(error);
    });
  }

}
