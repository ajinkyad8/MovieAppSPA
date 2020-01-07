import { Component, OnInit, Input } from '@angular/core';
import { ModeratorService } from 'src/app/services/moderator.service';
import { AlertService } from 'src/app/services/alert.service';
import { ArtistService } from 'src/app/services/artist.service';

@Component({
  selector: 'app-moderator-artist-activity',
  templateUrl: './moderator-artist-activity.component.html',
  styleUrls: ['./moderator-artist-activity.component.css']
})
export class ModeratorArtistActivityComponent implements OnInit {
  @Input() activity: any = [];

  constructor(private moderatorService: ModeratorService, private alertService: AlertService, private artistService: ArtistService) { }

  ngOnInit() { }

  getActivities() {
    this.moderatorService.getArtistActivityLogToReview().subscribe(res => {
      this.activity = res;
      this.activity.forEach(element => {
        this.artistService.getArtist(element.artistId).subscribe(artist => {
          element.savedArtist = artist;
        });
      });
    });
  }

  reviewActivity(id, isApproved) {
    this.moderatorService.reviewArtistActivity(id, isApproved).subscribe(() => {
      this.alertService.success('Successfully reviewed the activity');
      this.getActivities();
    }, error => {
      this.alertService.danger(error);
    });
  }
}
