import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { User } from '../../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  create(data: { name: string; email: string; password: string }): Observable<User> {
    return this.http.post<User>(this.apiUrl, data);
  }

  update(id: number, data: { name: string; email: string }): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.apiUrl}/${id}`, data);
  }

  toggle(id: number): Observable<{ active: number }> {
    return this.http.patch<{ active: number }>(`${this.apiUrl}/${id}/toggle`, {});
  }
}
