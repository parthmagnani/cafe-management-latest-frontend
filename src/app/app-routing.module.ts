import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';



const routes: Routes = [
  {
    path: 'home',
    component:LayoutComponent
  },
  { path: '', 
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
   
  },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
