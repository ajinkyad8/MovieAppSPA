import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { Artist } from 'src/app/models/artist';
import { MovieService } from 'src/app/services/movie.service';
import { ArtistService } from 'src/app/services/artist.service';
import { RoleType } from 'src/app/models/roleType';
import { MovieRole } from 'src/app/models/movieRole';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Movie } from 'src/app/models/movie';
import { MovieRoleService } from 'src/app/services/movieRole.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-movie-artist-card',
  templateUrl: './movie-artist-card.component.html',
  styleUrls: ['./movie-artist-card.component.css']
})
export class MovieArtistCardComponent implements OnInit {
  @Input() artist: Artist;
  @Input() roleType: RoleType;
  @Input() movie: Movie;
  movieArtist: any = {};
  roleDescription: string;
  modalRef: BsModalRef;

  constructor(private alertService: AlertService, private modalService: BsModalService, private movieRoleService: MovieRoleService) { }

  ngOnInit() {
  }

  addArtist() {
    this.movieArtist.roleType = this.roleType;
    this.movieArtist.roleTypeId = this.roleType.id;
    this.movieArtist.artistId = this.artist.id;
    this.movieArtist.movieId = this.movie.id;
    this.movieArtist.roleDescription = this.roleDescription;
    this.movieRoleService.createMovieRole(this.movieArtist).subscribe((res: MovieRole) => {
      this.modalRef.hide();
      res.artist.photoUrl = this.artist.photoUrl;
      this.alertService.success('Successfully added ' + res.artist.firstName + ' ' + res.artist.lastName + ' as ' + res.roleType.roleName +
      '.  A moderator shall soon review it.');
      this.movieRoleService.movieRoleSource.next(res);
    }, error => {
      this.modalRef.hide();
      this.alertService.danger(error);
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
