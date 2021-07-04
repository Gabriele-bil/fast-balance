import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardContainerComponent } from './components/dashboard-container.component';
import { DashboardSidebarComponent } from './components/dashboard-sidebar.component';
import { DashboardTopBarComponent } from './components/dashboard-top-bar.component';
import { SharedModule } from "../../shared/modules/shared.module";


@NgModule({
  declarations: [
    DashboardContainerComponent,
    DashboardSidebarComponent,
    DashboardTopBarComponent
  ],
  imports: [
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule {
}
