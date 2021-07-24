import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from "@features/dashboard/cms/components/cards.component";
import { EditCardComponent } from "@features/dashboard/cms/components/edit-card.component";

const routes: Routes = [
  { path: 'cards', component: CardsComponent },
  { path: 'cards/edit/:id', component: EditCardComponent },
  { path: 'cards/add', component: EditCardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsRoutingModule { }
