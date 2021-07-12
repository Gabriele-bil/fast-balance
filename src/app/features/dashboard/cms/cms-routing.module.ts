import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from "@features/dashboard/cms/components/card.component";

const routes: Routes = [
  { path: 'card', component: CardComponent },
  { path: 'card/:id', component: CardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsRoutingModule { }
