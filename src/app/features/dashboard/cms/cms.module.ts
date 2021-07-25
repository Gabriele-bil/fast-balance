import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsRoutingModule } from './cms-routing.module';
import { CardsComponent } from './components/cards.component';
import { EditCardComponent } from './components/edit-card.component';
import { EditCardMediaComponent } from './components/edit-card-media.component';
import { SharedModule } from "@shared/modules/shared.module";


@NgModule({
  declarations: [
    CardsComponent,
    EditCardComponent,
    EditCardMediaComponent
  ],
  imports: [
    CommonModule,
    CmsRoutingModule,
    SharedModule
  ]
})
export class CmsModule { }
