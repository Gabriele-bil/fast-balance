import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomePaymentRoutingModule } from './welcome-payment-routing.module';
import { WelcomePaymentContainerComponent } from './components/welcome-payment-container.component';
import { ListContainerComponent } from './components/list/list-container.component';
import { FiltersContainerComponent } from './components/filters/filters-container.component';


@NgModule({
  declarations: [
    WelcomePaymentContainerComponent,
    ListContainerComponent,
    FiltersContainerComponent
  ],
  imports: [
    CommonModule,
    WelcomePaymentRoutingModule
  ]
})
export class WelcomePaymentModule { }
