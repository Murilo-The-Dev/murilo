import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ReportsPageRoutingModule } from './reports-routing.module';
import { ReportsPage } from './reports.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ReportsPageRoutingModule],
  declarations: [ReportsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReportsPageModule {}
