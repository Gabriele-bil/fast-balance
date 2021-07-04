import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashobardContainerComponent } from "./components/dashobard-container.component";

const routes: Routes = [
  { path: '', component: DashobardContainerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
