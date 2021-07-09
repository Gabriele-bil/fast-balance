import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome-container',
  template: `
    <div id="container" class="row">
      <div class="col-12 col-lg-6">
        <app-welcome-summary></app-welcome-summary>
      </div>
      <div class="col-12 col-lg-6">
        <app-welcome-balances></app-welcome-balances>
      </div>
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
