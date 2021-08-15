import { Component, Input, OnInit } from '@angular/core';
import { Card } from "@shared/models/card.model";
import { IFormattedPayment } from "@shared/models/payment.model";
import { ISummary } from "@shared/models/summary.model";
import { CardService } from "@shared/services/card.service";

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
              <a routerLink="/dashboard/transaction">Vai alla lista completa</a>
            </div>
            <div class="payment d-flex justify-content-between align-items-center mb-3"
                 *ngFor="let payment of calculatedPayments.formattedPayments"
                 [title]="payment.cardName">
              <div class="d-flex">
                <img [src]="payment.cardIcon" alt="icon url">
                <h5 class="m-0 px-3">{{ payment.payment.date | date }}</h5>
                <div class="col"
                     [title]="payment.payment.note">{{ (payment.payment.note.length > 30) ? (payment.payment.note | slice:0:30) + '..' : (payment.payment.note) }}</div>
              </div>
              <app-money [quantity]="payment.payment.quantity"></app-money>
            </div>
          </div>
        </div>

        <app-balances-summary [currentDay]="currentDay" [summary]="calculatedPayments.summary"></app-balances-summary>
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

  public currentDay = new Date();
  public calculatedPayments!: { formattedPayments: IFormattedPayment[], summary: ISummary };

  constructor(private cardService: CardService) {
  }

  ngOnInit(): void {
    this.calculatedPayments = this.cardService.getPayments(this.cards);
    this.calculatedPayments.formattedPayments.sort((p1, p2) => new Date(p2.payment.date).getTime() - new Date(p1.payment.date).getTime())
    this.calculatedPayments.formattedPayments = this.calculatedPayments.formattedPayments.slice(0, 5);
  }

  get totalBalance(): number {
    return this.cards
      ? this.cards?.map(card => card.balance).reduce((acc, curr) => acc + curr, 0)
      : 0
  }
}
