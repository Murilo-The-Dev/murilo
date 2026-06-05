import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss']
})
export class ProductFormPage implements OnInit {
  @Input() product?: Product;

  form = this.fb.group({
    name: ['', [Validators.required]],
    description: [''],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]]
  });

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    if (!this.product) {
      return;
    }

    this.form.patchValue({
      name: this.product.name,
      description: this.product.description || '',
      price: this.product.price,
      stock: this.product.stock
    });
  }

  close(): void {
    void this.modalCtrl.dismiss();
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = {
      name: this.form.value.name as string,
      description: (this.form.value.description as string) || '',
      price: Number(this.form.value.price),
      stock: Number(this.form.value.stock)
    };

    if (this.product) {
      this.productService.update(this.product.id, payload).subscribe(() => {
        void this.modalCtrl.dismiss({ refresh: true });
      });
      return;
    }

    this.productService.create(payload).subscribe(() => {
      void this.modalCtrl.dismiss({ refresh: true });
    });
  }
}
