import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie';
import { Artist } from '../models/artist';
import { MoviePhoto } from '../models/moviePhoto';
import { ArtistPhoto } from '../models/artistPhoto';
import { MovieRole } from '../models/movieRole';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.baseUrl + 'users/';

  constructor(private http: HttpClient) { }

  getUserMovies(userId: number) {
    return this.http.get<Movie[]>(this.baseUrl + userId + '/movies');
  }

  getUserPendingMovies(userId: number) {
    return this.http.get<Movie[]>(this.baseUrl + userId + '/movies/pending');
  }

  getUserArtists(userId: number) {
    return this.http.get<Artist[]>(this.baseUrl + userId + '/artists');
  }

  getUserPendingArtists(userId: number) {
    return this.http.get<Artist[]>(this.baseUrl + userId + '/artists/pending');
  }

  getUserMoviePhotos(userId: number) {
    return this.http.get<MoviePhoto[]>(this.baseUrl + userId + '/movies/photos');
  }

  getUserPendingMoviePhotos(userId: number) {
    return this.http.get<MoviePhoto[]>(this.baseUrl + userId + '/movies/photos/pending');
  }

  getUserArtistPhotos(userId: number) {
    return this.http.get<ArtistPhoto[]>(this.baseUrl + userId + '/artists/photos');
  }

  getUserPendingArtistPhotos(userId: number) {
    return this.http.get<ArtistPhoto[]>(this.baseUrl + userId + '/artists/photos/pending');
  }

  getUserMovieRoles(userId: number) {
    return this.http.get(this.baseUrl + userId + '/movieRoles');
  }

  getUserPendingMovieRoles(userId: number) {
    return this.http.get<MovieRole[]>(this.baseUrl + userId + '/movieRoles/pending');
  }

  getUserMovieActivity(userId: number) {
    return this.http.get(this.baseUrl + userId + '/movies/activity');
  }

  getUserPendingMovieActivity(userId: number) {
    return this.http.get(this.baseUrl + userId + '/movies/activity/pending');
  }

  getUserArtistActivity(userId: number) {
    return this.http.get(this.baseUrl + userId + '/artists/activity');
  }

  getUserPendingArtistActivity(userId: number) {
    return this.http.get(this.baseUrl + userId + '/artists/activity/pending');
  }

  getUserMovieRoleActivity(userId: number) {
    return this.http.get(this.baseUrl + userId + '/movieRoles/activity');
  }

  getUserPendingMovieRoleActivity(userId: number) {
    return this.http.get(this.baseUrl + userId + '/movieRoles/activity/pending');
  }

  deletePendingArtist(id: number, artistId: number) {
    return this.http.delete(this.baseUrl + id + '/artists/' + artistId);
  }

  deletePendingMovie(id: number, movieId: number) {
    return this.http.delete(this.baseUrl + id + '/movies/' + movieId);
  }

  deletePendingMovieRole(id: number, movieRoleId: number) {
    return this.http.delete(this.baseUrl + id + '/movieRoles/' + movieRoleId);
  }

  deletePendingPhoto(id: number, photoId: number) {
    return this.http.delete(this.baseUrl + id + '/photos/' + photoId);
  }
  

  deletePendingArtistActivity(id: number, artistActivityId: number) {
    return this.http.delete(this.baseUrl + id + '/artists/activity/' + artistActivityId);
  }

  deletePendingMovieActivity(id: number, movieActivityId: number) {
    return this.http.delete(this.baseUrl + id + '/movies/activity/' + movieActivityId);
  }

  deletePendingMovieRoleActivity(id: number, movieRoleActivityId: number) {
    return this.http.delete(this.baseUrl + id + '/movieRoles/activity/' + movieRoleActivityId);
  }
}
