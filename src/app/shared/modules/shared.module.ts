import { NgModule } from '@angular/core';
import { MaterialModule } from "./material.module";
import { ReactiveFormsModule } from "@angular/forms";

const sharedModules = [MaterialModule, ReactiveFormsModule];

@NgModule({
  declarations: [],
  imports: [...sharedModules],
  exports: [...sharedModules]
})
export class SharedModule {
}
