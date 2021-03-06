import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsContainerComponent } from './components/settings-container.component';
import { SettingsSummaryComponent } from './components/settings-summary.component';
import { SharedModule } from '@shared/modules/shared.module';
import { SettingsFormComponent } from './components/settings-form.component';
@NgModule({
  declarations: [SettingsContainerComponent, SettingsSummaryComponent, SettingsFormComponent],
  imports: [CommonModule, SettingsRoutingModule, SharedModule],
})
export class SettingsModule {}
