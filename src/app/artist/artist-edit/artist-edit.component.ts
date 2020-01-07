import { Component, OnInit, Input } from '@angular/core';
import { Artist } from 'src/app/models/artist';
import { ArtistService } from 'src/app/services/artist.service';
import { AlertService } from 'src/app/services/alert.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-artist-edit',
  templateUrl: './artist-edit.component.html',
  styleUrls: ['./artist-edit.component.css']
})
export class ArtistEditComponent implements OnInit {
  id: number;
  artist: Artist;
  artistToSave: Artist;
  artistForm: FormGroup;

  constructor(private artistService: ArtistService, private alertService: AlertService, private formBuilder: FormBuilder,
              private route: ActivatedRoute, private authenticationService: AuthenticationService, private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    this.createForm();
    if (this.route.queryParams) {
      this.route.queryParams.subscribe(params => {
        this.id = params.id;
        if (this.id) {
        this.artistService.getArtist(this.id).subscribe(res => {
          this.artist = res;
          this.createForm();
        }, error => {
          this.alertService.danger(error);
        });
      }
      });
    }
  }

  createForm() {
    this.artistForm = this.formBuilder.group({
      firstName: [this.artist ? this.artist.firstName : '', Validators.required],
      lastName: [this.artist ? this.artist.lastName : '', Validators.required],
      knownAs: [this.artist ? this.artist.knownAs : ''],
      dateOfBirth: [this.artist ? (new Date(this.artist.dateOfBirth)).toLocaleDateString() : '', Validators.required],
      gender: [this.artist ? this.artist.gender : 'Male']
    });
  }

  save() {
    if (this.artistForm.valid) {
      if (this.artist) {
        this.artistService.updateArtist(this.getChangedValues(this.artist.id)).subscribe((res: Artist) => {
          this.artist = res;
          if (!this.artist.isApproved) {
          this.alertService.success('Successfully updated the entry');
          } else {
            this.alertService.success('Your changes have been submitted for approval. A moderator will review them shortly.');
          }
          this.artistForm.markAsPristine();
        }, error => {
          this.alertService.danger(error);
        });
      } else {
        this.artistToSave = Object.assign({}, this.artistForm.value);
        this.artistToSave.dateOfBirth = this.getUtcDate(this.artistToSave.dateOfBirth);
        this.artistService.createArtist(this.artistToSave).subscribe((res: Artist) => {
        this.artist = res;
        this.alertService.success('Successfully created new entry. A moderator shall soon review it.');
        this.artistForm.markAsPristine();
      }, error => {
        this.alertService.danger(error);
      });
    }
    }
  }

  changeDisplayPicture(url: string) {
    this.artist.photoUrl = url;
  }

  getChangedValues(id: number) {
    const changedValues: any = {};
    if (this.artist.isApproved) {
      changedValues.isArtistApproved = true;
    }
    changedValues.ArtistId = id;
    Object.keys(this.artistForm.controls).forEach(c => {
    const currentControl = this.artistForm.get(c);

    if (currentControl.dirty) {
      changedValues[c] = currentControl.value;
      if (c === 'dateOfBirth') {
        changedValues[c] = this.getUtcDate(currentControl.value);
      }
    }
  });
    return changedValues;
  }

  deleteArtist() {
    if (this.artist.isApproved) {
      this.alertService.confirmDelete('Are you sure you want to delete this artist?').then(res => {
        if (res.response) {
          const request: any = {};
          request.reason = res.reason;
          request.userId = this.authenticationService.decodedToken.nameid;
          request.artistId = this.artist.id;
          this.artistService.deleteArtist(this.artist.id, request).subscribe(() => {
            this.alertService.success('Your request to delete this artist has been placed. A moderator shall soon review it');
          }, error => {
            this.alertService.danger(error);
          });
        }
      });
  } else {
    this.alertService.confirmDelete('Are you sure you want to delete this artist?', true).then(res => {
      if (res.response) {
        this.userService.deletePendingArtist(this.authenticationService.decodedToken.nameid, this.artist.id).subscribe(() => {
          this.alertService.success('Successfully deleted the artist');
          this.router.navigate(['artists']);
        }, error => {
          this.alertService.danger(error);
        });
      }
    });
  }
  }

  getUtcDate(date: Date): Date {
    const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    return utcDate;
  }

}
