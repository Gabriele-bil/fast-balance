import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardContainerComponent } from "./components/dashboard-container.component";

const welcomeModule = () => import('./welcome/welcome.module').then(w => w.WelcomeModule);
const settingsModule = () => import('./settings/settings.module').then(s => s.SettingsModule);

const routes: Routes = [
  {
    path: '', component: DashboardContainerComponent,
    children: [
      { path: '', redirectTo: 'welcome' },
      { path: 'welcome', loadChildren: welcomeModule },
      { path: 'settings', loadChildren: settingsModule }
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
