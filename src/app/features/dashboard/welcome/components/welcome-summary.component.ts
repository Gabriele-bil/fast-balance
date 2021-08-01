import { Component, Input, OnInit } from '@angular/core';
import { Card } from "@shared/models/card.model";
import { Payment } from "@shared/models/payment.model";
import { WalletImg } from "@shared/models/enums";

@Component({
  selector: 'app-welcome-summary',
  template: `
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Sommario</h2>
      </div>
      <div class="card-body">
        <div class="total d-inline-block p-2">
          <h3 class="mb-0">Totale:
            <app-money [quantity]="totalBalance"></app-money>
          </h3>
        </div>

        <div class="row my-3">
          <div class="cards col-12 col-md-6">
            <h4>Carte</h4>
            <div class="d-flex justify-content-between" *ngFor="let card of cards">
              <h5>{{ card.name }}</h5>
              <app-money [quantity]="card.balance"></app-money>
            </div>
          </div>

          <div class="col-12 col-md-6">
            <h4>Ultimi movimenti</h4>
            <div class="payment d-flex justify-content-between align-items-center mb-1" *ngFor="let payment of payments" [title]="payment.cardName">
              <div class="d-flex">
                <img [src]="payment.cardIcon" alt="icon url">
                <h5 class="px-3">{{ payment.payment.date | date }}</h5>
                <h5>{{ payment.payment.note }}</h5>
              </div>
              <app-money [quantity]="payment.payment.quantity"></app-money>
            </div>
          </div>
        </div>

        <app-welcome-balances [currentDay]="currentDay"></app-welcome-balances>
      </div>
    </div>
  `,
  styles: [
    //language=scss
    `
      .card {
        .total {
          border: 1px solid #111112;
        }

        .cards {
          border-right: 1px solid #111112;
        }

        .payment {
          img {
            width: 1.5rem;
            height: 1.5rem;
          }
        }
      }
    `]
})
export class WelcomeSummaryComponent implements OnInit {
  @Input() cards: Card[] = [];

  public payments: { payment: Payment, cardIcon: WalletImg, cardName: string }[] = [];
  public currentDay = new Date();

  ngOnInit(): void {
    this.cards.forEach(card => card.payments?.forEach(payment => this.payments.push({
      payment,
      cardIcon: card.iconUrl,
      cardName: card.name
    })))
  }

  get totalBalance(): number {
    return this.cards
      ? this.cards?.map(card => card.balance).reduce((acc, curr) => acc + curr, 0)
      : 0
  }
}
