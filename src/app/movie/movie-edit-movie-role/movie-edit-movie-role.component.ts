import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { MovieRole } from 'src/app/models/movieRole';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { MovieRoleService } from 'src/app/services/movieRole.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-movie-edit-movie-role',
  templateUrl: './movie-edit-movie-role.component.html',
  styleUrls: ['./movie-edit-movie-role.component.css']
})
export class MovieEditMovieRoleComponent implements OnInit {
  movieRole: MovieRole;
  title: string;

  constructor(private movieRoleService: MovieRoleService, public bsModalRef: BsModalRef, private alertService: AlertService) { }

  ngOnInit() {
  }


  saveChanges() {
    const activity: any = {};
    activity.MovieRoleId = this.movieRole.id;
    activity.roleDescription = this.movieRole.roleDescription;
    activity.isMovieRoleApproved = this.movieRole.isApproved;
    this.movieRoleService.updateMovieRole(activity).subscribe(() => {
      if (!this.movieRole.isApproved) {
      this.alertService.success('Successfully updated the entry');
      } else {
        this.alertService.success('Your changes have been submitted for approval. A moderator will review them shortly.');
      }
      this.bsModalRef.hide();
    }, error => {
      this.alertService.danger(error);
      this.bsModalRef.hide();
    });
  }

}
