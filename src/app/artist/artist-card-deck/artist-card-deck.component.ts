import { Component, OnInit, Input } from '@angular/core';
import { RoleType } from 'src/app/models/roleType';
import { MovieRole } from 'src/app/models/movieRole';

@Component({
  selector: 'app-artist-card-deck',
  templateUrl: './artist-card-deck.component.html',
  styleUrls: ['./artist-card-deck.component.css']
})
export class ArtistCardDeckComponent implements OnInit {
  @Input() roleType: RoleType;
  @Input() movieRoles: MovieRole[];

  constructor() { }

  ngOnInit() {
  }

}
