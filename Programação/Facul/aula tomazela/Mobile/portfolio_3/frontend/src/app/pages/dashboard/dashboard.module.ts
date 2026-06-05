import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';
import { DashboardPage } from './dashboard.page';

@NgModule({
  imports: [CommonModule, IonicModule, DashboardPageRoutingModule],
  declarations: [DashboardPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardPageModule {}
