import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ClientService } from '../../core/services/client.service';
import { ProductService } from '../../core/services/product.service';
import { ReceivableService } from '../../core/services/receivable.service';
import { ReportService } from '../../core/services/report.service';
import { SaleService } from '../../core/services/sale.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage {
  counts = {
    users: 0,
    products: 0,
    clients: 0,
    sales: 0,
    receivables: 0,
    reports: 0
  };

  constructor(
    private userService: UserService,
    private productService: ProductService,
    private clientService: ClientService,
    private saleService: SaleService,
    private receivableService: ReceivableService,
    private reportService: ReportService,
    private router: Router
  ) {}

  ionViewWillEnter(): void {
    this.loadSummary();
  }

  go(path: string): void {
    void this.router.navigate([path]);
  }

  private loadSummary(): void {
    forkJoin({
      users: this.userService.getAll().pipe(
        map((rows) => rows.length),
        catchError(() => of(0))
      ),
      products: this.productService.getAll().pipe(
        map((rows) => rows.length),
        catchError(() => of(0))
      ),
      clients: this.clientService.getAll().pipe(
        map((rows) => rows.length),
        catchError(() => of(0))
      ),
      sales: this.saleService.getAll().pipe(
        map((rows) => rows.length),
        catchError(() => of(0))
      ),
      receivables: this.receivableService.getAll('open').pipe(
        map((rows) => rows.length),
        catchError(() => of(0))
      ),
      reports: this.reportService.getTopProducts(5).pipe(
        map((rows) => rows.length),
        catchError(() => of(0))
      )
    }).subscribe((result) => {
      this.counts = result;
    });
  }
}
