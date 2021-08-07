import { Component } from '@angular/core';
import { SpinnerService } from "@shared/services/spinner.service";

@Component({
  selector: 'app-root',
  template: `
    <app-spinner *ngIf="spinnerService.showSpinner$ | async"></app-spinner>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {

  constructor(public readonly spinnerService: SpinnerService) {
  }
}
