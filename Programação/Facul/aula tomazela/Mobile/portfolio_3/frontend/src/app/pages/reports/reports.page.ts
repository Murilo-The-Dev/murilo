import { Component } from '@angular/core';

import {
  ReceivablesReport,
  ReportService,
  SalesReportRow,
  TopProductRow
} from '../../core/services/report.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss']
})
export class ReportsPage {
  segment: 'sales' | 'receivables' | 'top' = 'sales';

  salesStart = this.dateOnly(new Date(new Date().setDate(new Date().getDate() - 30)).toISOString());
  salesEnd = this.dateOnly(new Date().toISOString());

  salesRows: SalesReportRow[] = [];
  receivablesData: ReceivablesReport = {
    open: { count: 0, total: 0 },
    paid: { count: 0, total: 0 },
    overdue: { count: 0, total: 0 }
  };
  topProducts: TopProductRow[] = [];

  constructor(private reportService: ReportService) {}

  ionViewWillEnter(): void {
    this.searchSales();
  }

  onSegmentChange(event: CustomEvent): void {
    this.segment = event.detail.value as 'sales' | 'receivables' | 'top';

    if (this.segment === 'receivables') {
      this.loadReceivablesReport();
      return;
    }

    if (this.segment === 'top') {
      this.loadTopProducts();
    }
  }

  searchSales(): void {
    this.reportService
      .getSales(this.dateOnly(this.salesStart), this.dateOnly(this.salesEnd))
      .subscribe((rows) => {
        this.salesRows = rows;
      });
  }

  get grandTotal(): number {
    return this.salesRows.reduce((sum, row) => sum + Number(row.total || 0), 0);
  }

  money(value = 0): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(Number(value));
  }

  private loadReceivablesReport(): void {
    this.reportService.getReceivables().subscribe((data) => {
      this.receivablesData = data;
    });
  }

  private loadTopProducts(): void {
    this.reportService.getTopProducts(5).subscribe((rows) => {
      this.topProducts = rows;
    });
  }

  private dateOnly(value: string): string {
    return String(value || '').slice(0, 10);
  }
}
