import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ProductFormPage } from './form/form.page';
import { ProductListPage } from './list/list.page';
import { ProductsPageRoutingModule } from './products-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, ProductsPageRoutingModule],
  declarations: [ProductListPage, ProductFormPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductsPageModule {}
