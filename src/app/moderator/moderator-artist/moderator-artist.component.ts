import { Component, OnInit, Input } from '@angular/core';
import { Artist } from 'src/app/models/artist';
import { ModeratorService } from 'src/app/services/moderator.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-moderator-artist',
  templateUrl: './moderator-artist.component.html',
  styleUrls: ['./moderator-artist.component.css']
})
export class ModeratorArtistComponent implements OnInit {
  @Input() artists: any = [];

  constructor(private moderatorService: ModeratorService, private alertService: AlertService) { }

  ngOnInit() { }

  getArtists() {
    this.moderatorService.getArtistsToReview().subscribe(res => {
      this.artists = res;
    });
  }

  review(artist, isApproved) {
    this.moderatorService.reviewArtist(artist.id, isApproved).subscribe(() => {
      this.alertService.success('Successfully reviewed new artist request');
      this.getArtists();
    }, error => {
      this.alertService.danger(error);
    });
  }

}
