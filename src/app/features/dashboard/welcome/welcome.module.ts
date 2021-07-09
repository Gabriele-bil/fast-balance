import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeContainerComponent } from './components/welcome-container.component';
import { WelcomeSummaryComponent } from './components/welcome-summary.component';
import { WelcomeBalancesComponent } from './components/welcome-balances.component';


@NgModule({
  declarations: [
    WelcomeContainerComponent,
    WelcomeSummaryComponent,
    WelcomeBalancesComponent
  ],
  imports: [
    CommonModule,
    WelcomeRoutingModule
  ]
})
export class WelcomeModule { }
