import { Component, OnInit, Input } from '@angular/core';
import { Artist } from 'src/app/models/artist';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-user-artist-list',
  templateUrl: './user-artist-list.component.html',
  styleUrls: ['./user-artist-list.component.css']
})
export class UserArtistListComponent implements OnInit {
  @Input() artists: Artist[];

  constructor(private userService: UserService, private authenticationService: AuthenticationService,
              private alertService: AlertService) { }

  ngOnInit() {
  }

  delete(artsitId: number, i) {
    event.stopPropagation();
    this.alertService.confirmDelete('Are you sure you want to delete this artist?', true).then(res => {
      if (res.response) {
        this.userService.deletePendingArtist(this.authenticationService.decodedToken.nameid, artsitId).subscribe(() => {
          this.alertService.success('Successfully deleted the artist');
          this.artists.splice(i, 1);
        }, error => {
          this.alertService.danger(error);
        });
      }
    });
  }

}
