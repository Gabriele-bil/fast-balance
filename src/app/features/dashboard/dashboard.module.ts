import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashobardContainerComponent } from './components/dashobard-container.component';
import { DashobardSidebarComponent } from './components/dashobard-sidebar.component';
import { DashobardTopbarComponent } from './components/dashobard-topbar.component';


@NgModule({
  declarations: [
    DashobardContainerComponent,
    DashobardSidebarComponent,
    DashobardTopbarComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
