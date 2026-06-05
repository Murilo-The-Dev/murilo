import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Product } from '../../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  create(data: Omit<Product, 'id' | 'active'>): Observable<{ id: number; name: string }> {
    return this.http.post<{ id: number; name: string }>(this.apiUrl, data);
  }

  update(id: number, data: Omit<Product, 'id' | 'active'>): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.apiUrl}/${id}`, data);
  }

  toggle(id: number): Observable<{ active: number }> {
    return this.http.patch<{ active: number }>(`${this.apiUrl}/${id}/toggle`, {});
  }
}
