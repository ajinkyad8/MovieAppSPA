import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-movie-photo',
  templateUrl: './user-movie-photo.component.html',
  styleUrls: ['./user-movie-photo.component.css']
})
export class UserMoviePhotoComponent implements OnInit {
  @Input() moviePhotos: any;

  constructor() { }

  ngOnInit() {
  }

}
