import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-money',
  template: `
    <span>
      {{ quantity }}
      <span *ngIf="currency === 'eur'">€</span>
      <span *ngIf="currency === 'usd'">$</span>
    </span>
  `,
  styles: []
})
export class MoneyComponent {
  @Input() quantity: number = 0;
  @Input() currency: 'eur' | 'usd' = 'eur';
}
