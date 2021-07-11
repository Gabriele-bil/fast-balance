import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingButtonComponent } from '../components/loading-button.component';
import { CommonModule } from '@angular/common';
import { MoneyComponent } from '@shared/components/money.component';
import { ModalComponent } from '@shared/components/modal.component';

const sharedComponents = [
  LoadingButtonComponent,
  MoneyComponent,
  ModalComponent,
];
const sharedModules = [CommonModule, MaterialModule, ReactiveFormsModule];

@NgModule({
  declarations: [...sharedComponents],
  imports: [...sharedModules],
  exports: [...sharedComponents, ...sharedModules],
})
export class SharedModule {}
