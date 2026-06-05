import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReceivablesListPage } from './list/list.page';

const routes: Routes = [
  {
    path: '',
    component: ReceivablesListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceivablesPageRoutingModule {}
