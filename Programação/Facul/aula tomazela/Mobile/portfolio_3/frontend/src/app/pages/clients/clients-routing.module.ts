import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientListPage } from './list/list.page';

const routes: Routes = [
  {
    path: '',
    component: ClientListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsPageRoutingModule {}
