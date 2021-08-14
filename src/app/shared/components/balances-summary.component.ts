import { Component, Input } from '@angular/core';
import { ISummary } from "@shared/models/summary.model";

@Component({
  selector: 'app-balances-summary',
  template: `
    <div id="container" class="w-100">
      <h3 class="mt-3 fw-bold">Bilancio mese {{ currentDay | date: 'MMMM' | titlecase }}</h3>
      <div class="row">
        <div class="col-6 col-md mb-4 mb-md-0">
          <h4>Spese</h4>
          <app-money [quantity]="-summary.expenses"></app-money>
        </div>
        <div class="col-6 col-md mb-4 mb-md-0">
          <h4>Introiti</h4>
          <app-money [quantity]="summary.income"></app-money>
        </div>
        <div class="col-6 col-md">
          <h4>Netto</h4>
          <app-money [quantity]="summary.net"></app-money>
        </div>
        <div class="col-6 col-md">
          <h4>Spese non necessarie</h4>
          <app-money [quantity]="-summary.unnecessaryExpenses"></app-money>
        </div>
      </div>
    </div>
  `,
  styles: [
    //language=scss
    `
      h3 {
        font-size: 1.5rem
      }
    `]
})
export class BalancesSummaryComponent {
  @Input() currentDay: Date = new Date();
  @Input() summary: ISummary = {
    expenses: 0,
    income: 0,
    net: 0,
    unnecessaryExpenses: 0
  };
}
