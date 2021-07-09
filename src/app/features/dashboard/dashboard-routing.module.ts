import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardContainerComponent } from "./components/dashboard-container.component";

const welcomeModule = () => import('./welcome/welcome.module').then(w => w.WelcomeModule);

const routes: Routes = [
  { path: '', component: DashboardContainerComponent,
    children: [
      { path: '', loadChildren: welcomeModule }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
