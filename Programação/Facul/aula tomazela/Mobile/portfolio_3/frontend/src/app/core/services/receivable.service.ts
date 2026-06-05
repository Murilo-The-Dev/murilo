import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Receivable } from '../../models/receivable.model';

@Injectable({ providedIn: 'root' })
export class ReceivableService {
  private apiUrl = `${environment.apiUrl}/receivables`;

  constructor(private http: HttpClient) {}

  getAll(status?: 'open' | 'paid' | 'overdue'): Observable<Receivable[]> {
    let params = new HttpParams();

    if (status) {
      params = params.set('status', status);
    }

    return this.http.get<Receivable[]>(this.apiUrl, { params });
  }

  pay(id: number): Observable<{ status: string; paid_at: string }> {
    return this.http.patch<{ status: string; paid_at: string }>(`${this.apiUrl}/${id}/pay`, {});
  }
}
