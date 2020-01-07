import { Component, OnInit, Input } from '@angular/core';
import { ModeratorService } from 'src/app/services/moderator.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-moderator-movie-role-delete',
  templateUrl: './moderator-movie-role-delete.component.html',
  styleUrls: ['./moderator-movie-role-delete.component.css']
})
export class ModeratorMovieRoleDeleteComponent implements OnInit {
  @Input() deleteRequests: any;

  constructor(private moderatorService: ModeratorService, private alertService: AlertService) { }

  ngOnInit() {
  }

  getMovieRoleDeleteRequests() {
    this.moderatorService.getMovieRoleDeleteRequests().subscribe(res => {
      this.deleteRequests = res;
    });
  }

  review(id: number, isApproved) {
    this.moderatorService.reviewMovieRoleDeleteRequest(id, isApproved).subscribe(() => {
      this.alertService.success('The request has been reviewed');
      this.getMovieRoleDeleteRequests();
    }, error => {
      this.alertService.danger(error);
    });
  }

}
