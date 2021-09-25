import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolsRoutingModule } from './tools-routing.module';
import { ToolsContainerComponent } from './components/tools-container.component';
import { ToolsEarnForMinutesComponent } from './components/tools-earn-for-minutes.component';


@NgModule({
  declarations: [
    ToolsContainerComponent,
    ToolsEarnForMinutesComponent
  ],
  imports: [
    CommonModule,
    ToolsRoutingModule
  ]
})
export class ToolsModule { }
