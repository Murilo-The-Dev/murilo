import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SalesCreatePage } from './create/create.page';
import { SalesListPage } from './list/list.page';
import { SalesPageRoutingModule } from './sales-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, SalesPageRoutingModule],
  declarations: [SalesListPage, SalesCreatePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SalesPageModule {}
