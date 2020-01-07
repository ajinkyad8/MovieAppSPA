import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: Movie[];
  pageNumber = 1;
  pageSize = 6;
  totalItems: number;
  search: string;
  sortingOptions = [{display: 'Name', value: 'name'}, {display: 'Release Date', value: 'release'},
  {display: 'Recently Added', value: 'recent'}];
  sortBy = 'name';
  descending = false;

  constructor(private movieService: MovieService, private alertService: AlertService) { }

  ngOnInit() {
    this.getMovies();
  }

  pageChanged(event) {
    this.pageNumber = event.page;
    this.getMovies();
  }

  getMovies() {
    this.movieService.getMovies(this.pageNumber, this.pageSize, this.search, this.sortBy, this.descending).subscribe(res => {
      this.movies = res.data;
      this.totalItems = res.pagination.totalItems;
    }, error => {
      this.alertService.danger(error);
    });
  }

  getAscending() {
    this.descending = false;
    this.getMovies();
  }

  getDescending() {
    this.descending = true;
    this.getMovies();
  }

}
