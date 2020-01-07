import { Component, OnInit, Input } from '@angular/core';
import { RoleType } from 'src/app/models/roleType';
import { MovieRole } from 'src/app/models/movieRole';

@Component({
  selector: 'app-movie-detail-card-deck',
  templateUrl: './movie-detail-card-deck.component.html',
  styleUrls: ['./movie-detail-card-deck.component.css']
})
export class MovieDetailCardDeckComponent implements OnInit {
  @Input() roleType: RoleType;
  @Input() movieRoles: MovieRole[];

  constructor() { }

  ngOnInit() {
  }
}
