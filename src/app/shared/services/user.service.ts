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
}
