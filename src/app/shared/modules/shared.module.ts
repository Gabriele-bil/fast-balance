import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingButtonComponent } from '../components/loading-button.component';
import { CommonModule } from '@angular/common';
import { MoneyComponent } from '@shared/components/money.component';
import { ModalComponent } from '@shared/components/modal.component';
import { PaymentEditComponent } from "@shared/components/payment-edit.component";
import { RouterModule } from "@angular/router";
import { ConfirmButtonsComponent } from "@shared/components/confirm-buttons.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

const sharedComponents = [
  LoadingButtonComponent,
  MoneyComponent,
  ModalComponent,
  PaymentEditComponent,
  ConfirmButtonsComponent
];
const sharedModules = [CommonModule, MaterialModule, ReactiveFormsModule, RouterModule, NgbModule];

@NgModule({
  declarations: [...sharedComponents],
  imports: [...sharedModules ],
  exports: [...sharedComponents, ...sharedModules],
})
export class SharedModule {}
