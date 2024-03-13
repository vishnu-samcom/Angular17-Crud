import { Injectable } from '@angular/core';
import { API_BASE_URL, API_ENDPOINTS } from '../utils/api.constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = API_BASE_URL;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}${API_ENDPOINTS.API_GET_PRODUCTS}`);
  }
}
