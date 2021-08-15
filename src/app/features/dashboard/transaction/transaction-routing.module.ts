import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionContainerComponent } from "@features/dashboard/transaction/components/transaction-container.component";

const routes: Routes = [
  { path: '', component: TransactionContainerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
