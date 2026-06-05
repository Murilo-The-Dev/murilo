import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SalesCreatePage } from './create/create.page';
import { SalesListPage } from './list/list.page';

const routes: Routes = [
  {
    path: '',
    component: SalesListPage
  },
  {
    path: 'create',
    component: SalesCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesPageRoutingModule {}
