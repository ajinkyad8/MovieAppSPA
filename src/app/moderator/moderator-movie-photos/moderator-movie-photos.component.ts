import { Component, OnInit, Input } from '@angular/core';
import { ModeratorService } from 'src/app/services/moderator.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-moderator-movie-photos',
  templateUrl: './moderator-movie-photos.component.html',
  styleUrls: ['./moderator-movie-photos.component.css']
})
export class ModeratorMoviePhotosComponent implements OnInit {
  @Input() moviePhotos: any = [];

  constructor(private moderatorService: ModeratorService, private alertService: AlertService) { }

  ngOnInit() { }

  getPhotos() {
    this.moderatorService.getMoviePhotosToReview().subscribe(res => {
      this.moviePhotos = res;
    });
  }

  reviewPhoto(moviePhoto, isApproved, i) {
    this.moderatorService.reviewMoviePhoto(moviePhoto.movieId, moviePhoto.photoId, isApproved).subscribe(() => {
      this.alertService.success('Successfully reviewed the photo');
      this.getPhotos();
    }, error => {
      this.alertService.danger(error);
    });
  }

}
