import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

import { ClientService } from '../../../core/services/client.service';
import { Client } from '../../../models/client.model';
import { ClientFormPage } from '../form/form.page';

@Component({
  selector: 'app-client-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss']
})
export class ClientListPage {
  clients: Client[] = [];
  filteredClients: Client[] = [];

  constructor(
    private clientService: ClientService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {}

  ionViewWillEnter(): void {
    this.loadClients();
  }

  onSearch(event: CustomEvent): void {
    const query = String(event.detail.value || '').toLowerCase();
    this.filteredClients = this.clients.filter((client) =>
      client.name.toLowerCase().includes(query)
    );
  }

  async openForm(client?: Client): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: ClientFormPage,
      componentProps: { client }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data?.refresh) {
      this.loadClients();
    }
  }

  async confirmToggle(client: Client): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Alterar status',
      message: 'Deseja ativar/inativar este cliente?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Confirmar',
          handler: () => this.toggle(client)
        }
      ]
    });

    await alert.present();
  }

  badgeColor(active: number): 'success' | 'medium' {
    return active ? 'success' : 'medium';
  }

  private loadClients(): void {
    this.clientService.getAll().subscribe((clients) => {
      this.clients = clients;
      this.filteredClients = clients;
    });
  }

  private toggle(client: Client): void {
    this.clientService.toggle(client.id).subscribe(() => {
      this.loadClients();
    });
  }
}
