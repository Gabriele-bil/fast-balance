import { Component, OnDestroy, OnInit } from '@angular/core';
import { MeService } from "@shared/services/me.service";
import { Observable, Subscription } from "rxjs";
import { Card } from "@shared/models/card.model";
import { Payment } from "@shared/models/payment.model";
import { CardService } from "@shared/services/card.service";

@Component({
  selector: 'app-welcome-container',
  template: `
    <div id="container" class="p-3 p-md-4" *ngIf="cards$ | async as cards">
      <div class="mb-3">
        <app-payment-edit [cards]="cards" (save)="savePayment($event)"></app-payment-edit>
      </div>
      <ng-container>
        <app-welcome-summary [cards]="cards"></app-welcome-summary>
      </ng-container>
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
export class WelcomeContainerComponent implements OnInit, OnDestroy {
  public cards$: Observable<Card[]> | undefined;
  private subscription!: Subscription;

  constructor(private meService: MeService, private cardService: CardService) {
  }

  ngOnInit(): void {
    this.getCards()
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  public savePayment(event: { card: string, payment: Payment }): void {
    this.subscription = this.cardService.addPayment(event.card, event.payment).subscribe(() => this.getCards());
  }

  private getCards(): void {
    this.cards$ = this.meService.getCards();
  }
}
