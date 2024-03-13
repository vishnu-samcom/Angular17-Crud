import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL, API_ENDPOINTS } from '../utils/api.constants';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = API_BASE_URL;

  constructor(private http: HttpClient) {}

  getUserList(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}${API_ENDPOINTS.API_GET_USERS}`);
  }

  getSingleUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}${API_ENDPOINTS.API_GET_SINGLE_USER}/${id}`);
  }

  updateUser(id: string, payload: any): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}${API_ENDPOINTS.API_UPDATE_USER}/${id}`, payload);
  }

  addUser(payload: any): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}${API_ENDPOINTS.API_ADD_USER}`, payload);
  }

  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}${API_ENDPOINTS.API_DELETE_USER}/${id}`);
  }
}
