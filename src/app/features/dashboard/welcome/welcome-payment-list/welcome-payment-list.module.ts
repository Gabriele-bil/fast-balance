import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomePaymentListRoutingModule } from './welcome-payment-list-routing.module';
import { WelcomePaymentListContainerComponent } from './components/welcome-payment-list-container.component';


@NgModule({
  declarations: [
    WelcomePaymentListContainerComponent
  ],
  imports: [
    CommonModule,
    WelcomePaymentListRoutingModule
  ]
})
export class WelcomePaymentListModule { }
