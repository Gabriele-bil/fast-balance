import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeContainerComponent } from "@features/dashboard/welcome/components/welcome-container.component";

const routes: Routes = [
  { path: '', component: WelcomeContainerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule {
}
