import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomePaymentRoutingModule } from './welcome-payment-routing.module';
import { WelcomePaymentContainerComponent } from './components/welcome-payment-container.component';
import { ListContainerComponent } from './components/list/list-container.component';
import { FiltersContainerComponent } from './components/filters/filters-container.component';
import { WelcomePaymentSingleComponent } from './components/list/welcome-payment-single.component';
import { SharedModule } from "@shared/modules/shared.module";


@NgModule({
  declarations: [
    WelcomePaymentContainerComponent,
    ListContainerComponent,
    FiltersContainerComponent,
    WelcomePaymentSingleComponent
  ],
  imports: [
    CommonModule,
    WelcomePaymentRoutingModule,
    SharedModule
  ]
})
export class WelcomePaymentModule { }
