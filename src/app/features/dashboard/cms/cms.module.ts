import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsRoutingModule } from './cms-routing.module';
import { CardsComponent } from './components/cards.component';
import { EditCardComponent } from './components/edit-card.component';
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    CardsComponent,
    EditCardComponent
  ],
  imports: [
    CommonModule,
    CmsRoutingModule,
    ReactiveFormsModule
  ]
})
export class CmsModule { }
