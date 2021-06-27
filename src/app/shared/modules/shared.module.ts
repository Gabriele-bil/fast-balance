import { NgModule } from '@angular/core';
import { MaterialModule } from "./material.module";

const sharedModules = [MaterialModule];

@NgModule({
  declarations: [],
  imports: [...sharedModules],
  exports: [...sharedModules]
})
export class SharedModule {
}
