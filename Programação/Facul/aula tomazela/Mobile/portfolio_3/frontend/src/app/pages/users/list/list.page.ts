import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

import { UserService } from '../../../core/services/user.service';
import { User } from '../../../models/user.model';
import { UserFormPage } from '../form/form.page';

@Component({
  selector: 'app-user-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss']
})
export class UserListPage {
  users: User[] = [];
  filteredUsers: User[] = [];

  constructor(
    private userService: UserService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {}

  ionViewWillEnter(): void {
    this.loadUsers();
  }

  onSearch(event: CustomEvent): void {
    const query = String(event.detail.value || '').toLowerCase();
    this.filteredUsers = this.users.filter(
      (user) => user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query)
    );
  }

  async openForm(user?: User): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: UserFormPage,
      componentProps: { user }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data?.refresh) {
      this.loadUsers();
    }
  }

  async confirmToggle(user: User): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Alterar status',
      message: 'Deseja ativar/inativar este usuario?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Confirmar',
          handler: () => this.toggle(user)
        }
      ]
    });

    await alert.present();
  }

  badgeColor(active: number): 'success' | 'medium' {
    return active ? 'success' : 'medium';
  }

  private loadUsers(): void {
    this.userService.getAll().subscribe((users) => {
      this.users = users;
      this.filteredUsers = users;
    });
  }

  private toggle(user: User): void {
    this.userService.toggle(user.id).subscribe(() => {
      this.loadUsers();
    });
  }
}
