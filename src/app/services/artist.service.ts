import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Artist } from '../models/artist';
import { Observable } from 'rxjs';
import { PaginatedData } from '../helpers/paginatedData';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  baseUrl = environment.baseUrl + 'artists/';

  constructor(private http: HttpClient) { }

  getArtists(pageNumber?, pageSize?, search?, sortBy?, descending?): Observable<PaginatedData<Artist[]>> {
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
    return this.http.get<Artist[]>(this.baseUrl, {observe: 'response', params})
    .pipe(
      map(res => {
        const paginatedData = new PaginatedData<Artist[]>();
        paginatedData.data = res.body;
        paginatedData.pagination = JSON.parse(res.headers.get('Pagination'));
        return paginatedData;
      })
    );
  }

  createArtist(artist: Artist) {
    return this.http.post(this.baseUrl, artist);
  }

  getArtist(id: number) {
    return this.http.get<Artist>(this.baseUrl + id);
  }

  updateArtist(artist: Artist) {
    return this.http.put(this.baseUrl, artist);
  }

  deleteArtist(id: number, request: any) {
    return this.http.post(this.baseUrl + 'deleteRequest/' + id, request);
  }

  getArtistActivity(id: number) {
    return this.http.get(this.baseUrl + id + '/activity');
  }

}
