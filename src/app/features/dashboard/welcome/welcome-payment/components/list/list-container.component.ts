import { Component, OnInit } from '@angular/core';
import { Card } from "@shared/models/card.model";
import { MeService } from "@shared/services/me.service";
import { CardService } from "@shared/services/card.service";
import { IFormattedPayment, Importance } from "@shared/models/payment.model";
import { ISummary } from "@shared/models/summary.model";
import moment from "moment";

@Component({
  selector: 'app-welcome-payment-list-container',
  template: `
    <div class="card">
      <div class="card-body">
        <ng-container *ngIf="item">
          <div *ngFor="let formattedPayment of item.formattedPayments; let i = index" class="my-4">
            <h1 *ngIf="i === 0" class="mb-2 text-center">
              {{ formattedPayment.payment.date | date:'MMMM' | titlecase }}
            </h1>

            <app-welcome-payment-single [item]="formattedPayment"></app-welcome-payment-single>

            <div *ngIf="showSummary(i)" class="card summary p-3 mt-3 mb-5">
              <app-balances-summary [summary]="calculateSummary(i)" [currentDay]="getCurrentMonth(i)  "></app-balances-summary>
            </div>

            <h1 *ngIf="showSummary(i)" class="mb-2 text-center">
              {{ item.formattedPayments[i+1]?.payment?.date | date:'MMMM' | titlecase }}
            </h1>
          </div>
        </ng-container>
      </div>
    </div>
  `,
  styles: [
    //language=scss
    `
      .card {
        .summary {
          color: #fafafa;
          background-color: #312244;
        }
      }
    `]
})
export class ListContainerComponent implements OnInit {
  public cards: Card[] = [];
  public item: { formattedPayments: IFormattedPayment[], summary: ISummary } = {
    formattedPayments: [], summary: {
      expenses: 0,
      income: 0,
      net: 0,
      unnecessaryExpenses: 0
    }
  };
  public initialMonthIndex: number = 0;

  constructor(private meService: MeService, private cardService: CardService) {
  }

  ngOnInit(): void {
    this.meService.getCards().subscribe(cards => {
      this.cards = cards;
      this.item = this.cardService.getPayments(cards);
      this.item.formattedPayments = this.item.formattedPayments.sort(
        (a, b) => new Date(b.payment.date).getTime() - new Date(a.payment.date).getTime())
    })
  }

  public showMonth(index: number): boolean {
    return moment(this.item.formattedPayments[index].payment.date).month()
      !== moment(this.item.formattedPayments[index + 1]?.payment.date).month()
  }

  public showSummary(index: number): boolean {
    return (!this.item.formattedPayments[index + 1] ||
      moment(this.item.formattedPayments[index].payment.date).month()
      !== moment(this.item.formattedPayments[index + 1]?.payment.date).month());
  }

  public getCurrentMonth(index: number): Date {
    return new Date(this.item.formattedPayments[index].payment.date);
  }

  public calculateSummary(index: number): ISummary {
    // TODO fare con una pipe ?
    const summary: ISummary = {
      expenses: 0,
      income: 0,
      net: 0,
      unnecessaryExpenses: 0
    };

    let monthFormattedPayments: IFormattedPayment[] = [...this.item.formattedPayments];
    monthFormattedPayments = monthFormattedPayments.splice(this.initialMonthIndex, index);

    monthFormattedPayments.forEach(item => {
      item.payment.quantity > 0
        ? summary.income += item.payment.quantity
        : summary.expenses -= item.payment.quantity;

      if (item.payment.importance === Importance.LOW && item.payment.quantity < 0) {
        summary.unnecessaryExpenses -= item.payment.quantity
      }
    })

    summary.net = summary.income - summary.expenses;

    this.initialMonthIndex = index + 1 === this.item.formattedPayments.length ? 0 : index + 1;

    return summary;
  }
}
