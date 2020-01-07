import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { ArtistService } from '../services/artist.service';
import { Artist } from '../models/artist';
import { Movie } from '../models/movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  artists: Artist[];
  movies: Movie[];

  constructor(private movieService: MovieService, private artistService: ArtistService) { }

  ngOnInit() {
    this.artistService.getArtists(1, 2, '' , 'recent').subscribe(res => {
      this.artists = res.data;
    });
    this.movieService.getMovies(1, 2, '', 'recent').subscribe(res => {
      this.movies = res.data;
    });
  }

}
