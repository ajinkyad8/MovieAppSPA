import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MovieRole } from '../models/movieRole';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieRoleService {
  baseUrl = environment.baseUrl + 'movieRoles/';
  movieRoleSource = new Subject<MovieRole>();
  $movieRoleSource = this.movieRoleSource.asObservable();

  constructor(private http: HttpClient) { }

  getMovieRoles() {
    return this.http.get<MovieRole[]>(this.baseUrl);
  }

  getMovieRole(id: number) {
    return this.http.get<MovieRole>(this.baseUrl + id);
  }

  createMovieRole(movieRole: MovieRole) {
    return this.http.post(this.baseUrl, movieRole);
  }

  deleteMovieRole(id: number, deleteRequest: any) {
    return this.http.post(this.baseUrl + 'deleteRequest/' + id, deleteRequest);
  }

  updateMovieRole(movieRole: MovieRole) {
    return this.http.put(this.baseUrl, movieRole);
  }

}
