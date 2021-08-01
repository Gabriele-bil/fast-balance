import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-money',
  template: `
    <span [ngClass]="quantity > 0 ? 'text-success' : 'text-danger'">
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
