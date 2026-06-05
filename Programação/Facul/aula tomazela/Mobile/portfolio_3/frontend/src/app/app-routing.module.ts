import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginPageModule)
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then((m) => m.DashboardPageModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./pages/users/users.module').then((m) => m.UsersPageModule)
      },
      {
        path: 'products',
        loadChildren: () => import('./pages/products/products.module').then((m) => m.ProductsPageModule)
      },
      {
        path: 'clients',
        loadChildren: () => import('./pages/clients/clients.module').then((m) => m.ClientsPageModule)
      },
      {
        path: 'sales',
        loadChildren: () => import('./pages/sales/sales.module').then((m) => m.SalesPageModule)
      },
      {
        path: 'receivables',
        loadChildren: () => import('./pages/receivables/receivables.module').then((m) => m.ReceivablesPageModule)
      },
      {
        path: 'reports',
        loadChildren: () => import('./pages/reports/reports.module').then((m) => m.ReportsPageModule)
      }
    ]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
