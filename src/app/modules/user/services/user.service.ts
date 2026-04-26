import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateUserModel, UserReponse, UserUpdateRolesModel, UserWithRoles } from '../models/http/users.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly http = inject(HttpClient);

  
  getUsers(): Observable<UserReponse>{
    return this.http.get<UserReponse>(`${environment.urlBase}users/`);
  }

  getUser(userId: string): Observable<UserWithRoles>{
    return this.http.get<UserWithRoles>(`${environment.urlBase}users/${userId}`);
  }

  createUser(user: CreateUserModel): Observable<UserWithRoles>{
    return this.http.post<UserWithRoles>(`${environment.urlBase}users/`, user);
  }

  updateRolesByUser(userId: string, roles: UserUpdateRolesModel): Observable<UserWithRoles>{
    return this.http.put<UserWithRoles>(`${environment.urlBase}users/${userId}/roles`, roles);
  }

}