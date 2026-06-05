import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ClientFormPage } from './form/form.page';
import { ClientListPage } from './list/list.page';
import { ClientsPageRoutingModule } from './clients-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, ClientsPageRoutingModule],
  declarations: [ClientListPage, ClientFormPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClientsPageModule {}
