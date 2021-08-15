import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardContainerComponent } from "./components/dashboard-container.component";

const welcomeModule = () => import('./welcome/welcome.module').then(w => w.WelcomeModule);
const settingsModule = () => import('./settings/settings.module').then(s => s.SettingsModule);
const cmsModule = () => import('./cms/cms.module').then(c => c.CmsModule);
const transactionModule = () => import('./transaction/transaction.module').then(t => t.TransactionModule);

const routes: Routes = [
  {
    path: '', component: DashboardContainerComponent,
    children: [
      { path: '', redirectTo: 'welcome' },
      { path: 'welcome', loadChildren: welcomeModule },
      { path: 'settings', loadChildren: settingsModule },
      { path: 'cms', loadChildren: cmsModule },
      { path: 'transaction', loadChildren: transactionModule },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
