import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';
import { TransactionContainerComponent } from './components/transaction-container.component';
import { ListContainerComponent } from './components/list/list-container.component';
import { FiltersContainerComponent } from './components/filters/filters-container.component';
import { SingleComponent } from './components/list/single.component';
import { SharedModule } from "@shared/modules/shared.module";


@NgModule({
  declarations: [
    TransactionContainerComponent,
    ListContainerComponent,
    FiltersContainerComponent,
    SingleComponent
  ],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    SharedModule
  ]
})
export class TransactionModule { }
