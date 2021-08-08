import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePaymentContainerComponent } from "@features/dashboard/welcome/welcome-payment/components/welcome-payment-container.component";

const routes: Routes = [
  { path: '', component: WelcomePaymentContainerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomePaymentRoutingModule { }
