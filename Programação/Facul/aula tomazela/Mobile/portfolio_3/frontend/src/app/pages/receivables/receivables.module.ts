import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ReceivablesListPage } from './list/list.page';
import { ReceivablesPageRoutingModule } from './receivables-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ReceivablesPageRoutingModule],
  declarations: [ReceivablesListPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReceivablesPageModule {}
