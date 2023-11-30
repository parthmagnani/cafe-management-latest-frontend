import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { CategoryComponent } from '../category/category.component';

const routes: Routes = [
  { 
    path: '', 
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: MainDashboardComponent
      },
      { 
        path: 'category', 
        loadChildren: () => import('../category/category.module').then(m => m.CategoryModule) 
      },
      { path: 'product', 
        loadChildren: () => import('../product/product.module').then(m => m.ProductModule) 
      },
      { 
        path: 'orders', 
        loadChildren: () => import('../orders/orders.module').then(m => m.OrdersModule) 
      },
      { path: 'bills', 
        loadChildren: () => import('../bills/bills.module').then(m => m.BillsModule) 
      },
      { path: 'users', 
        loadChildren: () => import('../users/users.module').then(m => m.UsersModule) 
      }
    ] 
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
