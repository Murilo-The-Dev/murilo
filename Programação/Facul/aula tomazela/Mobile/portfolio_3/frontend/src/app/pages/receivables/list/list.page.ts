import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { ReceivableService } from '../../../core/services/receivable.service';
import { Receivable } from '../../../models/receivable.model';

@Component({
  selector: 'app-receivables-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss']
})
export class ReceivablesListPage {
  status: 'open' | 'overdue' | 'paid' = 'open';
  receivables: Receivable[] = [];

  constructor(
    private receivableService: ReceivableService,
    private alertCtrl: AlertController
  ) {}

  ionViewWillEnter(): void {
    this.loadReceivables();
  }

  onSegmentChange(event: CustomEvent): void {
    this.status = event.detail.value as 'open' | 'overdue' | 'paid';
    this.loadReceivables();
  }

  statusColor(status: Receivable['status']): 'warning' | 'success' | 'danger' {
    if (status === 'paid') {
      return 'success';
    }

    if (status === 'overdue') {
      return 'danger';
    }

    return 'warning';
  }

  money(value = 0): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(Number(value));
  }

  async confirmPay(receivable: Receivable): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Registrar recebimento',
      message: 'Deseja marcar este recebivel como pago?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Confirmar',
          handler: () => this.pay(receivable.id)
        }
      ]
    });

    await alert.present();
  }

  private loadReceivables(): void {
    this.receivableService.getAll(this.status).subscribe((rows) => {
      this.receivables = rows;
    });
  }

  private pay(id: number): void {
    this.receivableService.pay(id).subscribe(() => {
      this.loadReceivables();
    });
  }
}
