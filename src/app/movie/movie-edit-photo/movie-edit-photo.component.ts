import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MoviePhoto } from 'src/app/models/moviePhoto';
import { AlertService } from 'src/app/services/alert.service';
import { PhotoService } from 'src/app/services/photo.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-movie-edit-photo',
  templateUrl: './movie-edit-photo.component.html',
  styleUrls: ['./movie-edit-photo.component.css']
})
export class MovieEditPhotoComponent implements OnInit {
  @Output() url = new EventEmitter();
  @Input() moviePhotos: MoviePhoto[];
  @Input() id: number;
  files: any = [];
  loading = false;

  constructor(private photoService: PhotoService, private alertService: AlertService, private userService: UserService,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    if (!this.moviePhotos) {
      this.moviePhotos = [];
    }
  }

  addFromDropzone(event) {
    let i;
    for ( i = 0; i < event.length; i++) {
      const element = event[i];
      this.files.push(element);
    }
  }

  deleteAttachment(index) {
    this.files.splice(index, 1);
  }

  addFromForm(files: FileList) {
    let i;
    for ( i = 0; i < files.length; i++) {
      if (files.item(i).size > (10 * 1024 * 1024)) {
        this.alertService.warning('Max file size 10 MB');
        continue;
      }
      this.files.push(files.item(i));
    }
  }

  uploadPhotos() {
    let i;
    for ( i = 0; i < this.files.length ; i ++) {
      this.loading = true;
      const fileToUpload = this.files[i];
      const formData: FormData = new FormData();
      formData.append('File', fileToUpload, fileToUpload.name);
      this.photoService.addMoviePhoto(formData, this.id).subscribe((res: MoviePhoto) => {
        if (this.moviePhotos.length === 0) {
          this.url.emit(res.photo.url);
        }
        this.alertService.success('Successfully added the photo. A moderator shall soon review it.');
        this.files.splice(this.files.indexOf(fileToUpload), 1);
        this.moviePhotos.push(res);
        this.loading = false;
      }, error => {
        this.alertService.danger(error);
        this.loading = false;
      });
    }
  }

  deletePhoto(moviePhoto, i) {
      if (moviePhoto.photo.isApproved) {
      this.alertService.confirmDelete('Are you sure you want to delete this photo?').then(res => {
        if (res.response) {
          const request: any = {};
          request.reason = res.reason;
          request.userId = this.authenticationService.decodedToken.nameid;
          request.photoId = moviePhoto.photo.id;
          this.photoService.deleteMoviePhoto(this.id, moviePhoto.photo.id, request).subscribe(() => {
          this.alertService.success('Your request to delete this photo has been placed. A moderator shall soon review it');
      }, error => {
        this.alertService.danger(error);
      });
        }
      });
    } else {
      this.alertService.confirmDelete('Are you sure you want to delete this photo?', true).then(res => {
        if (res.response) {
          this.userService.deletePendingPhoto(this.authenticationService.decodedToken.nameid, moviePhoto.photo.id).subscribe(() => {
            this.alertService.success('Successfully deleted the photo');
            this.moviePhotos.splice(i, 1);
          }, error => {
            this.alertService.danger(error);
          });
        }
      });
    }
  }

  setDisplayPicture(moviePhoto) {
    this.photoService.setMovieDisplayPhoto(this.id, moviePhoto.photo.id).subscribe(() => {
      this.url.emit(moviePhoto.photo.url);
    }, error => {
      this.alertService.danger(error);
    });
  }


}
