import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { UserFormPage } from './form/form.page';
import { UserListPage } from './list/list.page';
import { UsersPageRoutingModule } from './users-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, UsersPageRoutingModule],
  declarations: [UserListPage, UserFormPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UsersPageModule {}
