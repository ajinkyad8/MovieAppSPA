import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-artist-photo',
  templateUrl: './user-artist-photo.component.html',
  styleUrls: ['./user-artist-photo.component.css']
})
export class UserArtistPhotoComponent implements OnInit {
  @Input() artistPhotos: any;

  constructor() { }

  ngOnInit() {
  }

}
