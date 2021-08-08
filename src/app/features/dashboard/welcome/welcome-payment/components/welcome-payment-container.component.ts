import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome-payment-container',
  template: `
    <div id="container" class="p-3 p-md-4">
      <div class="row">
        <div class="col-12 col-md-3">
          <app-welcome-payment-filters-container></app-welcome-payment-filters-container>
        </div>
        <div class="col-12 col-md-9">
          <app-welcome-payment-list-container></app-welcome-payment-list-container>
        </div>
      </div>
    </div>
  `,
  styles: [
    //language=scss
    `
      #container {
        width: calc(100vw - 80px);

        @media (max-width: 768px) {
          width: 100vw;
          margin-bottom: 50px;
        }
      }
    `]
})
export class WelcomePaymentContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
