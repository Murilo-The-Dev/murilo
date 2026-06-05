import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { SaleService } from '../../../core/services/sale.service';
import { Sale } from '../../../models/sale.model';

@Component({
  selector: 'app-sales-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss']
})
export class SalesListPage {
  sales: Sale[] = [];

  constructor(
    private saleService: SaleService,
    private alertCtrl: AlertController
  ) {}

  ionViewWillEnter(): void {
    this.loadSales();
  }

  statusColor(status?: string): 'medium' | 'success' | 'danger' {
    if (status === 'completed') {
      return 'success';
    }

    if (status === 'cancelled') {
      return 'danger';
    }

    return 'medium';
  }

  money(value = 0): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(Number(value));
  }

  async confirmCancel(sale: Sale): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Cancelar venda',
      message: 'Deseja cancelar esta venda?',
      buttons: [
        { text: 'Nao', role: 'cancel' },
        {
          text: 'Sim',
          handler: () => this.cancelSale(sale.id as number)
        }
      ]
    });

    await alert.present();
  }

  private loadSales(): void {
    this.saleService.getAll().subscribe((sales) => {
      this.sales = sales;
    });
  }

  private cancelSale(id: number): void {
    this.saleService.cancel(id).subscribe(() => {
      this.loadSales();
    });
  }
}
