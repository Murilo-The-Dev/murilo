import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ClientService } from '../../../core/services/client.service';
import { ProductService } from '../../../core/services/product.service';
import { SaleService } from '../../../core/services/sale.service';
import { Client } from '../../../models/client.model';
import { Product } from '../../../models/product.model';

interface AddedItem {
  product_id: number;
  product_name: string;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-sales-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss']
})
export class SalesCreatePage implements OnInit {
  clients: Client[] = [];
  products: Product[] = [];

  clientId?: number;
  selectedProductId?: number;
  quantity = 1;

  items: AddedItem[] = [];

  toastOpen = false;
  toastMessage = '';

  constructor(
    private clientService: ClientService,
    private productService: ProductService,
    private saleService: SaleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadOptions();
  }

  addItem(): void {
    if (!this.selectedProductId || this.quantity < 1) {
      return;
    }

    const product = this.products.find((p) => p.id === Number(this.selectedProductId));
    if (!product) {
      return;
    }

    const existingItem = this.items.find((item) => item.product_id === product.id);

    if (existingItem) {
      existingItem.quantity += Number(this.quantity);
    } else {
      this.items.push({
        product_id: product.id,
        product_name: product.name,
        quantity: Number(this.quantity),
        price: Number(product.price)
      });
    }

    this.selectedProductId = undefined;
    this.quantity = 1;
  }

  removeItem(index: number): void {
    this.items.splice(index, 1);
  }

  get total(): number {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  money(value = 0): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(Number(value));
  }

  confirmSale(): void {
    if (!this.clientId || this.items.length === 0) {
      return;
    }

    const payload = {
      client_id: Number(this.clientId),
      items: this.items.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity
      }))
    };

    this.saleService.create(payload).subscribe({
      next: () => {
        void this.router.navigate(['/sales']);
      },
      error: (error) => {
        this.toastMessage = error?.error?.error || 'Falha ao registrar venda';
        this.toastOpen = true;
      }
    });
  }

  private loadOptions(): void {
    this.clientService.getAll().subscribe((clients) => {
      this.clients = clients;
    });

    this.productService.getAll().subscribe((products) => {
      this.products = products;
    });
  }
}
