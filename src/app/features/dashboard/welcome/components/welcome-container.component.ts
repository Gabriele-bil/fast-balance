import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome-container',
  template: `
    <div id="container">
        <app-payment-edit></app-payment-edit>
    </div>
  `,
  styles: [
    //language=scss
    `
      #container {
        width: calc(100vw - 300px);
      }
    `]
})
export class WelcomeContainerComponent {
}
