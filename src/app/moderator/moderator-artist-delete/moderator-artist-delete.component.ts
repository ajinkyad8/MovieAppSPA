import { Component, OnInit, Input } from '@angular/core';
import { ModeratorService } from 'src/app/services/moderator.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-moderator-artist-delete',
  templateUrl: './moderator-artist-delete.component.html',
  styleUrls: ['./moderator-artist-delete.component.css']
})
export class ModeratorArtistDeleteComponent implements OnInit {
  @Input() deleteRequests: any;

  constructor(private moderatorService: ModeratorService, private alertService: AlertService) { }

  ngOnInit() {
  }


  getArtistDeleteRequests() {
    this.moderatorService.getArtistDeleteRequests().subscribe(res => {
      this.deleteRequests = res;
    });
  }
  review(id: number, isApproved) {
    this.moderatorService.reviewArtistDeleteRequest(id, isApproved).subscribe(() => {
      this.alertService.success('The request has been reviewed');
      this.getArtistDeleteRequests();
    }, error => {
      this.alertService.danger(error);
    });
  }

}
