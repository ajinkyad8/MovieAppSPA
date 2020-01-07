import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Artist } from '../models/artist';
import { Movie } from '../models/movie';
import { MovieRole } from '../models/movieRole';

@Injectable({
  providedIn: 'root'
})
export class ModeratorService {
  baseUrl = environment.baseUrl + 'moderator/';

  constructor(private http: HttpClient) { }

  getArtistsToReview() {
    return this.http.get(this.baseUrl + 'artist');
  }

  reviewArtist(artistId: number, isApproved: boolean) {
    return this.http.post(this.baseUrl + 'artist/review/' + artistId + '/' + isApproved, {});
  }

  getMoviesToReview() {
    return this.http.get(this.baseUrl + 'movie');
  }

  reviewMovie(movieId: number, isApproved: boolean) {
    return this.http.post(this.baseUrl + 'movie/review/' + movieId + '/' + isApproved, {});
  }

  getArtistActivityLogToReview() {
    return this.http.get(this.baseUrl + 'artist/activity');
  }

  reviewArtistActivity(artistActivityId: number, isApproved: boolean) {
    return this.http.post(this.baseUrl + 'artist/activity/' + artistActivityId + '/' + isApproved, {});
  }

  getMovieActivityLogToReview() {
    return this.http.get(this.baseUrl + 'movie/activity');
  }

  reviewMovieActivity(movieActivityId: number, isApproved: boolean) {
    return this.http.post(this.baseUrl + 'movie/activity/' + movieActivityId + '/' + isApproved, {});
  }

  getMovieRolesToReview() {
    return this.http.get(this.baseUrl + 'movieRole');
  }

  reviewMovieRole(id: number, isApproved: boolean) {
    return this.http.post(this.baseUrl + 'movieRole/' + id + '/' + isApproved, {});
  }

  getMovieRoleActivityToReview() {
    return this.http.get(this.baseUrl + 'movieRole/activity');
  }

  reviewMovieRoleActivity(id: number, isApproved: boolean) {
    return this.http.post(this.baseUrl + 'movieRole/activity/' + id + '/' + isApproved, {});
  }

  getArtistPhotosToReview() {
    return this.http.get(this.baseUrl + 'photo/artists');
  }

  reviewArtistPhoto(artistId: number, photoId: number, isApproved: boolean) {
    return this.http.post(this.baseUrl + 'photo/artist/' + artistId + '/' + photoId + '/' + isApproved, {});
  }

  getMoviePhotosToReview() {
    return this.http.get(this.baseUrl + 'photo/movies');
  }

  reviewMoviePhoto(movieId: number, photoId: number, isApproved: boolean) {
    return this.http.post(this.baseUrl + 'photo/movie/' + movieId + '/' + photoId + '/' + isApproved, {});
  }

  getArtistDeleteRequests() {
    return this.http.get(this.baseUrl + 'artist/deleteRequests');
  }

  getMovieDeleteRequests() {
    return this.http.get(this.baseUrl + 'movie/deleteRequests');
  }

  getMovieRoleDeleteRequests() {
    return this.http.get(this.baseUrl + 'movieRole/deleteRequests');
  }

  getArtistPhotosWithDeleteRequests() {
    return this.http.get(this.baseUrl + 'photo/artists/deleteRequests');
  }

  getMoviePhotosWithDeleteRequests() {
    return this.http.get(this.baseUrl + 'photo/movies/deleteRequests');
  }

  getArtistPhototoDeleteRequests(id: number) {
    return this.http.get(this.baseUrl + 'photo/artist/deleteRequests/' + id);
  }

  getMoviePhotosDeleteRequests(id: number) {
    return this.http.get(this.baseUrl + 'photo/movie/deleteRequests/' + id);
  }

  reviewArtistDeleteRequest(id: number, isApproved: boolean) {
    return this.http.delete(this.baseUrl + 'artist/deleteRequest/' + id + '/' + isApproved);
  }

  reviewMovieDeleteRequest(id: number, isApproved: boolean) {
    return this.http.delete(this.baseUrl + 'movie/deleteRequest/' + id + '/' + isApproved);
  }

  reviewMovieRoleDeleteRequest(id: number, isApproved: boolean) {
    return this.http.delete(this.baseUrl + 'movieRole/deleteRequest/' + id + '/' + isApproved);
  }

  reviewPhotoDeleteRequest(id: number, isApproved: boolean) {
    return this.http.delete(this.baseUrl + 'photo/deleteRequest/' + id + '/' + isApproved);
  }

}
