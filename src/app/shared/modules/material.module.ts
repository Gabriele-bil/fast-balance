import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

const materialModules = [MatCardModule];

@NgModule({
  declarations: [],
  imports: [...materialModules],
  exports: [...materialModules]
})
export class MaterialModule {
}
