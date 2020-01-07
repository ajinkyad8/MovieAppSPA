import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.baseUrl + 'admin/';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(this.baseUrl);
  }

  updateUserRoles(user, roles) {
    return this.http.post(this.baseUrl + user.userName, roles);
  }
}
