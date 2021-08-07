import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeContainerComponent } from './components/welcome-container.component';
import { WelcomeSummaryComponent } from './components/welcome-summary.component';
import { WelcomeBalancesComponent } from './components/welcome-balances.component';
import { SharedModule } from "@shared/modules/shared.module";


@NgModule({
  declarations: [
    WelcomeContainerComponent,
    WelcomeSummaryComponent,
    WelcomeBalancesComponent
  ],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    SharedModule
  ]
})
export class WelcomeModule { }
