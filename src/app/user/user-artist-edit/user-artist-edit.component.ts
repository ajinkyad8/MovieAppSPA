import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-user-artist-edit',
  templateUrl: './user-artist-edit.component.html',
  styleUrls: ['./user-artist-edit.component.css']
})
export class UserArtistEditComponent implements OnInit {
@Input() artistActivity: any;
  constructor(private userService: UserService, private authenticationService: AuthenticationService,
              private alertService: AlertService) { }

  ngOnInit() {
  }

  delete(activityId, i) {
    this.alertService.confirmDelete('Are you sure you want to delete this edit?', true).then(res => {
      if (res.response) {
      this.userService.deletePendingArtistActivity(this.authenticationService.decodedToken.nameid, activityId).subscribe(() => {
        this.alertService.success('Successfully removed the edit request');
        this.artistActivity.splice(i, 1);
      }, error => {
        this.alertService.danger(error);
      });
      }
    });
  }

}
