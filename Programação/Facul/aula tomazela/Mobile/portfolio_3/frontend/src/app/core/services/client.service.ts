import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Client } from '../../models/client.model';

@Injectable({ providedIn: 'root' })
export class ClientService {
  private apiUrl = `${environment.apiUrl}/clients`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl);
  }

  getById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/${id}`);
  }

  create(data: Omit<Client, 'id' | 'active'>): Observable<{ id: number; name: string }> {
    return this.http.post<{ id: number; name: string }>(this.apiUrl, data);
  }

  update(
    id: number,
    data: Pick<Client, 'name' | 'email' | 'phone' | 'address'>
  ): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.apiUrl}/${id}`, data);
  }

  toggle(id: number): Observable<{ active: number }> {
    return this.http.patch<{ active: number }>(`${this.apiUrl}/${id}/toggle`, {});
  }
}
