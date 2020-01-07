import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/movie';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedData } from '../helpers/paginatedData';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  baseUrl = environment.baseUrl + 'movies/';

  constructor(private http: HttpClient) { }

  getMovies(pageNumber?, pageSize?, search?, sortBy?, descending?): Observable<PaginatedData<Movie[]>> {
    let params = new HttpParams();
    if (pageNumber && pageSize) {
      params = params.append('pageNumber', pageNumber);
      params = params.append('pageSize', pageSize);
    }
    if (search) {
      params = params.append('search', search);
    }
    if (sortBy) {
      params = params.append('sortBy', sortBy);
    }
    if (descending) {
      params = params.append('descending', descending);
    }
    return this.http.get<Movie[]>(this.baseUrl, {observe: 'response', params}).pipe(
      map(res => {
        const paginatedData = new PaginatedData<Movie[]>();
        paginatedData.data = res.body;
        paginatedData.pagination = JSON.parse(res.headers.get('Pagination'));
        return paginatedData;
      })
    );
  }

  getMovie(id: number) {
    return this.http.get<Movie>(this.baseUrl + id);
  }

  createMovie(movie: Movie) {
    return this.http.post(this.baseUrl, movie);
  }

  updateMovie(movie: Movie) {
    return this.http.put(this.baseUrl, movie);
  }

  deleteMovie(id: number, request: any) {
    return this.http.post(this.baseUrl + 'deleteRequest/' + id, request);
  }

  getMovieActivityLog(id: number) {
    return this.http.get(this.baseUrl + id + '/activity');
  }

}

