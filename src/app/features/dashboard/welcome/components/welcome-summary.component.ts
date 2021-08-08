import { Component, Input, OnInit } from '@angular/core';
import { Card } from "@shared/models/card.model";
import { Importance, Payment } from "@shared/models/payment.model";
import { WalletImg } from "@shared/models/enums";
import { Summary } from "@shared/models/summary.model";
import moment from 'moment';

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
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h4 class="mb-0">Ultimi movimenti</h4>
              <a routerLink="payment-list">Vai alla lista completa</a>
            </div>
            <div class="payment d-flex justify-content-between align-items-center mb-3" *ngFor="let payment of payments"
                 [title]="payment.cardName">
              <div class="d-flex">
                <img [src]="payment.cardIcon" alt="icon url">
                <h5 class="m-0 px-3">{{ payment.payment.date | date }}</h5>
                <h5  class="m-0">{{ payment.payment.note }}</h5>
              </div>
              <app-money [quantity]="payment.payment.quantity"></app-money>
            </div>
          </div>
        </div>

        <app-welcome-balances [currentDay]="currentDay" [summary]="summary"></app-welcome-balances>
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
  public summary: Summary = {
    expenses: 0,
    income: 0,
    net: 0,
    unnecessaryExpenses: 0
  };

  ngOnInit(): void {
    this.cards.forEach(card =>
      card.payments?.forEach(payment => {
        this.payments.push({
          payment,
          cardIcon: card.iconUrl,
          cardName: card.name
        })
        this.setSummary(payment);
        this.summary.net = this.summary.income - this.summary.expenses;
      })
    );
    this.payments.sort((p1, p2) => new Date(p2.payment.date).getTime() - new Date(p1.payment.date).getTime()).slice(0, 4);
    this.payments = this.payments.slice(0, 5);
  }

  get totalBalance(): number {
    return this.cards
      ? this.cards?.map(card => card.balance).reduce((acc, curr) => acc + curr, 0)
      : 0
  }

  public setSummary(payment: Payment): void {
    if (moment(payment.date).month() === moment().month()) {
      payment.quantity < 0
        ? this.summary.expenses -= payment.quantity
        : this.summary.income += payment.quantity;

      if (payment.quantity < 0 && payment.importance === Importance.LOW) {
        this.summary.unnecessaryExpenses -= payment.quantity
      }
    }
  }
}
