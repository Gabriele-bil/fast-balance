import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePaymentListContainerComponent } from "@features/dashboard/welcome/welcome-payment-list/components/welcome-payment-list-container.component";

const routes: Routes = [
  { path: '', component: WelcomePaymentListContainerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomePaymentListRoutingModule { }
