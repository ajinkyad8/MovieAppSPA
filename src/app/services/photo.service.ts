import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  addMoviePhoto(photo: any, id: number) {
    return this.http.post(this.baseUrl + 'photos/movie/' + id, photo);
  }

  deleteMoviePhoto(movieId: number, photoId: number, request: any) {
    return this.http.post(this.baseUrl + 'photos/movie/deleteRequest/' + movieId + '/' + photoId, request);
  }

  setMovieDisplayPhoto(movieId: number, photoId: number) {
    return this.http.put(this.baseUrl + 'photos/movie/' + movieId + '/' + photoId, {});
  }


  addArtistPhoto(photo: any, id: number) {
    return this.http.post(this.baseUrl + 'photos/artist/' + id, photo);
  }

  deleteArtistPhoto(artistId: number, photoId: number, request: any) {
    return this.http.post(this.baseUrl + 'photos/artist/deleteRequest/' + artistId + '/' + photoId, request);
  }

  setArtistDisplayPhoto(artistId: number, photoId: number) {
    return this.http.put(this.baseUrl + 'photos/artist/' + artistId + '/' + photoId, {});
  }
}
