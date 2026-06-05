import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Sale } from '../../models/sale.model';

@Injectable({ providedIn: 'root' })
export class SaleService {
  private apiUrl = `${environment.apiUrl}/sales`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Sale[]> {
    return this.http.get<Sale[]>(this.apiUrl);
  }

  getById(id: number): Observable<Sale> {
    return this.http.get<Sale>(`${this.apiUrl}/${id}`);
  }

  create(data: { client_id: number; items: Array<{ product_id: number; quantity: number }> }): Observable<{ id: number; total: number }> {
    return this.http.post<{ id: number; total: number }>(this.apiUrl, data);
  }

  cancel(id: number): Observable<{ status: string }> {
    return this.http.patch<{ status: string }>(`${this.apiUrl}/${id}/cancel`, {});
  }
}
