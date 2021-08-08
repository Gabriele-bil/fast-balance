import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeContainerComponent } from "@features/dashboard/welcome/components/welcome-container.component";

const paymentListModule = () => import('./welcome-payment-list/welcome-payment-list.module').then(p => p.WelcomePaymentListModule);

const routes: Routes = [
  { path: '', component: WelcomeContainerComponent },
  { path: 'payment-list',  loadChildren: paymentListModule }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule {
}
