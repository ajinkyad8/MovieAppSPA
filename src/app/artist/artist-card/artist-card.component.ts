import { Component, OnInit, Input } from '@angular/core';
import { Artist } from 'src/app/models/artist';

@Component({
  selector: 'app-artist-card',
  templateUrl: './artist-card.component.html',
  styleUrls: ['./artist-card.component.css']
})
export class ArtistCardComponent implements OnInit {
  @Input() artist: any;
  movieRoles: any = [{}];

  constructor() { }

  ngOnInit() {
    this.movieRoles = this.artist.movieRoles;
  }

}
