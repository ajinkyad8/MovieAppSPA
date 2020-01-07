import { Component, OnInit, TemplateRef } from '@angular/core';
import { Artist } from 'src/app/models/artist';
import { ArtistService } from 'src/app/services/artist.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { MovieRole } from 'src/app/models/movieRole';
import { RoleType } from 'src/app/models/roleType';
import { RoleTypeService } from 'src/app/services/roleType.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.css']
})
export class ArtistDetailComponent implements OnInit {
  id: number;
  artist: Artist;
  seperatedMovieRoles = [];
  movieRoles: MovieRole[];
  roleTypes: RoleType[];
  movieRoleToAdd: any = {};
  movieRolesByType = [];
  artistActivity: any = [];
  firstActivity: any;
  modalRef: BsModalRef;

  constructor(private artistService: ArtistService, private route: ActivatedRoute, private alertService: AlertService,
              private roleTypeService: RoleTypeService, private modalService: BsModalService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(data => {
      this.id = data.id;
      this.artistService.getArtist(this.id).subscribe(res => {
        this.artist = res;
        this.seperateMovieRoles();
      }, error => {
        this.alertService.danger(error);
      });
    });
  }

  seperateMovieRoles() {
    if (this.artist) {
    this.movieRoles = this.artist.movieRoles;
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

  getActivity() {
  }

  openActivityLog(template: TemplateRef<any>) {
    this.artistService.getArtistActivity(this.artist.id).subscribe(res => {
      this.firstActivity = res[0];
      this.artistActivity = res;
      this.artistActivity.splice(0, 1);
      this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
    }, error => {
      this.alertService.danger(error);
    });
  }

}
