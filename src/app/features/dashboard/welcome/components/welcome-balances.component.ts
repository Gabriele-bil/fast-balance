import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-welcome-balances',
  template: `
    <div id="container">
      <h3 class="mt-3">Bilancio mese {{ currentDay | date: 'MMMM' }}</h3>
      <div class="row">
        <div class="col">
          <h4>Spese</h4>
        </div>
        <div class="col">
          <h4>Introiti</h4>
        </div>
        <div class="col">
          <h4>Netto</h4>
        </div>
        <div class="col">
          <h4>Differenza mese precedente</h4>
        </div>
        <div class="col">
          <h4>Spese non necessarie</h4>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <app-money [quantity]="-23"></app-money>
        </div>
        <div class="col">
          <app-money [quantity]="223"></app-money>
        </div>
        <div class="col">
          <app-money [quantity]="200"></app-money>
        </div>
        <div class="col">
          <app-money [quantity]="200"></app-money>
        </div>
        <div class="col">
          <app-money [quantity]="-50"></app-money>
        </div>
      </div>
    </div>
  `,
  styles: [
    // language=scss
    `
      #container {
        border-top: 1px solid #111112;
      }
    `]
})
export class WelcomeBalancesComponent {
  @Input() currentDay: Date = new Date();
}
