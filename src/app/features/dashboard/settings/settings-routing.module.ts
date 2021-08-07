import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsContainerComponent } from "@features/dashboard/settings/components/settings-container.component";

const routes: Routes = [
  { path: '', component: SettingsContainerComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {
}
