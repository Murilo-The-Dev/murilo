import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

export interface SalesReportRow {
  date: string;
  count: number;
  total: number;
}

export interface ReceivableGroup {
  count: number;
  total: number;
}

export interface ReceivablesReport {
  open: ReceivableGroup;
  paid: ReceivableGroup;
  overdue: ReceivableGroup;
}

export interface TopProductRow {
  product_name: string;
  quantity_sold: number;
  revenue: number;
}

@Injectable({ providedIn: 'root' })
export class ReportService {
  private apiUrl = `${environment.apiUrl}/reports`;

  constructor(private http: HttpClient) {}

  getSales(start: string, end: string): Observable<SalesReportRow[]> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<SalesReportRow[]>(`${this.apiUrl}/sales`, { params });
  }

  getReceivables(status?: 'open' | 'paid' | 'overdue'): Observable<ReceivablesReport> {
    const params = status ? new HttpParams().set('status', status) : undefined;
    return this.http.get<ReceivablesReport>(`${this.apiUrl}/receivables`, { params });
  }

  getTopProducts(limit = 5): Observable<TopProductRow[]> {
    const params = new HttpParams().set('limit', String(limit));
    return this.http.get<TopProductRow[]>(`${this.apiUrl}/top-products`, { params });
  }
}
