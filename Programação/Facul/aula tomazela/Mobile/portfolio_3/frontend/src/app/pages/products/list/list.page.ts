import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../models/product.model';
import { ProductFormPage } from '../form/form.page';

@Component({
  selector: 'app-product-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss']
})
export class ProductListPage {
  products: Product[] = [];
  filteredProducts: Product[] = [];

  constructor(
    private productService: ProductService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {}

  ionViewWillEnter(): void {
    this.loadProducts();
  }

  onSearch(event: CustomEvent): void {
    const query = String(event.detail.value || '').toLowerCase();
    this.filteredProducts = this.products.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
  }

  async openForm(product?: Product): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: ProductFormPage,
      componentProps: { product }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data?.refresh) {
      this.loadProducts();
    }
  }

  async confirmToggle(product: Product): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Alterar status',
      message: 'Deseja ativar/inativar este produto?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Confirmar',
          handler: () => this.toggle(product)
        }
      ]
    });

    await alert.present();
  }

  badgeColor(active: number): 'success' | 'medium' {
    return active ? 'success' : 'medium';
  }

  private loadProducts(): void {
    this.productService.getAll().subscribe((products) => {
      this.products = products;
      this.filteredProducts = products;
    });
  }

  private toggle(product: Product): void {
    this.productService.toggle(product.id).subscribe(() => {
      this.loadProducts();
    });
  }
}
