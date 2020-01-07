import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { RoleType } from '../models/roleType';

@Injectable({
  providedIn: 'root'
})
export class RoleTypeService {
  baseUrl = environment.baseUrl + 'roleTypes/';

constructor(private http: HttpClient) { }

getRoleTypes() {
  return this.http.get<RoleType[]>(this.baseUrl);
}

createRoleType(roleType) {
  return this.http.post(this.baseUrl,  roleType);
}

deleteRoleType(id) {
  return this.http.delete(this.baseUrl + id);
}

editRoleType(roleType: RoleType) {
  return this.http.put(this.baseUrl + roleType.id, roleType);
}
}
