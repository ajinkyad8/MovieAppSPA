import { Component, OnInit } from '@angular/core';
import { ArtistService } from 'src/app/services/artist.service';
import { Artist } from 'src/app/models/artist';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css']
})
export class ArtistListComponent implements OnInit {
  artists: Artist[];
  pageNumber = 1;
  pageSize = 6;
  totalItems: number;
  search: string;
  sortingOptions = [{display: 'Name', value: 'name'}, {display: 'Age', value: 'age'}, {display: 'Recently Added', value: 'recent'}];
  sortBy = 'name';
  descending = false;

  constructor(private artistService: ArtistService) { }

  ngOnInit() {
    this.getArtists();
  }
  pageChanged(event) {
    this.pageNumber = event.page;
    this.getArtists();
  }

  getArtists() {
    this.artistService.getArtists(this.pageNumber, this.pageSize, this.search, this.sortBy, this.descending).subscribe(res => {
      this.artists = res.data;
      this.totalItems = res.pagination.totalItems;
    });
  }

  getAscending() {
    this.descending = false;
    this.getArtists();
  }

  getDescending() {
    this.descending = true;
    this.getArtists();
  }
}
