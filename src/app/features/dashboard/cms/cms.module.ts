import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsRoutingModule } from './cms-routing.module';
import { CardsComponent } from './components/cards.component';
import { EditCardComponent } from './components/edit-card.component';
import { ReactiveFormsModule } from "@angular/forms";
import { EditCardMediaComponent } from './components/edit-card-media.component';


@NgModule({
  declarations: [
    CardsComponent,
    EditCardComponent,
    EditCardMediaComponent
  ],
  imports: [
    CommonModule,
    CmsRoutingModule,
    ReactiveFormsModule
  ]
})
export class CmsModule { }
