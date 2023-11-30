import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';

import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';

@NgModule({
  declarations: [
    DashboardComponent,
    AdminHeaderComponent,
    SideNavComponent,
    MainDashboardComponent,
    
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule
  ]
})
export class DashboardModule { }
