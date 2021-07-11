import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsContainerComponent } from './components/settings-container.component';
import { SettingsSummaryComponent } from './components/settings-summary.component';
import { SharedModule } from "@shared/modules/shared.module";
import { SettingsModalComponent } from './components/settings-modal.component';


@NgModule({
  declarations: [
    SettingsContainerComponent,
    SettingsSummaryComponent,
    SettingsModalComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule
  ]
})
export class SettingsModule {
}
