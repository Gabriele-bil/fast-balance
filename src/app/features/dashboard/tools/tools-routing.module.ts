import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToolsContainerComponent } from "@features/dashboard/tools/components/tools-container.component";

const routes: Routes = [
  { path: '', component: ToolsContainerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToolsRoutingModule { }
