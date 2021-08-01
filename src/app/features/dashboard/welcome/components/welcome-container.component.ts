import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome-container',
  template: `
    <div id="container" class="p-3 p-md-4">
        <app-payment-edit></app-payment-edit>
    </div>
  `,
  styles: [
    //language=scss
    `
      #container {
        width: calc(100vw - 80px);
      }
    `]
})
export class WelcomeContainerComponent {
}
