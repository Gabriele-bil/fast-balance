import { NgModule } from '@angular/core';
import { MaterialModule } from "./material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { LoadingButtonComponent } from "../components/loading-button.component";
import { CommonModule } from "@angular/common";

const sharedComponents = [LoadingButtonComponent]
const sharedModules = [CommonModule, MaterialModule, ReactiveFormsModule];

@NgModule({
  declarations: [...sharedComponents],
  imports: [...sharedModules],
  exports: [...sharedComponents, ...sharedModules]
})
export class SharedModule {
}
