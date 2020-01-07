import { Component, OnInit, Input } from '@angular/core';
import { ModeratorService } from 'src/app/services/moderator.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-moderator-movie-delete',
  templateUrl: './moderator-movie-delete.component.html',
  styleUrls: ['./moderator-movie-delete.component.css']
})
export class ModeratorMovieDeleteComponent implements OnInit {
  @Input() deleteRequests: any;

  constructor(private moderatorService: ModeratorService, private alertService: AlertService) { }

  ngOnInit() {
  }

  getMovieDeleteRequests() {
    this.moderatorService.getMovieDeleteRequests().subscribe(res => {
      this.deleteRequests = res;
    });
  }

  review(id: number, isApproved) {
    this.moderatorService.reviewMovieDeleteRequest(id, isApproved).subscribe(() => {
      this.alertService.success('The request has been reviewed');
      this.getMovieDeleteRequests();
    }, error => {
      this.alertService.danger(error);
    });
  }

}
