import { Component, OnInit, Input } from '@angular/core';
import { ModeratorService } from 'src/app/services/moderator.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-moderator-artist-photos',
  templateUrl: './moderator-artist-photos.component.html',
  styleUrls: ['./moderator-artist-photos.component.css']
})
export class ModeratorArtistPhotosComponent implements OnInit {
  @Input() artistPhotos: any = [];

  constructor(private moderatorService: ModeratorService, private alertService: AlertService) { }

  ngOnInit() { }

  getPhotos() {
    this.moderatorService.getArtistPhotosToReview().subscribe(res => {
      this.artistPhotos = res;
    });
  }

  reviewPhoto(artistPhoto, isApproved, i) {
    this.moderatorService.reviewArtistPhoto(artistPhoto.artistId, artistPhoto.photoId, isApproved).subscribe(() => {
      this.alertService.success('Successfully reviewed the photo');
      this.getPhotos();
    }, error => {
      this.alertService.danger(error);
    });
  }

}
