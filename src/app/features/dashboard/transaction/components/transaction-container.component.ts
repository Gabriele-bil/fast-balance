import { Component, OnInit } from '@angular/core';
import { IFormattedPayment } from "@shared/models/payment.model";
import { ISummary } from "@shared/models/summary.model";
import { MeService } from "@shared/services/me.service";
import { CardService } from "@shared/services/card.service";
import moment from "moment";

@Component({
  selector: 'app-transaction-container',
  template: `
    <div id="container" class="p-3 p-md-4">
      <div class="row">
        <div class="col-12 col-lg-3">
          <app-welcome-payment-filters-container></app-welcome-payment-filters-container>
        </div>
        <div class="col-12 col-lg-9">
          <app-welcome-payment-list-container [calculatedCard]="calculatedCard" [paymentDates]="paymentDates"></app-welcome-payment-list-container>
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
export class TransactionContainerComponent implements OnInit {
  public calculatedCard: { formattedPayments: IFormattedPayment[], summary: ISummary } = {
    formattedPayments: [],
    summary: {
      expenses: 0,
      income: 0,
      net: 0,
      unnecessaryExpenses: 0
    }
  };
  public paymentDates: { month: number, year: number, show: boolean }[] = [];

  constructor(private meService: MeService, private cardService: CardService) { }

  ngOnInit(): void {
    this.meService.getCards().subscribe(cards => {
      this.calculatedCard = this.cardService.getPayments(cards);
      this.calculatedCard.formattedPayments.forEach(formattedPayment => {
        if (!this.checkIfDateExist(formattedPayment)) {
          this.paymentDates.push({
            month: moment(formattedPayment.payment.date).month(),
            year: moment(formattedPayment.payment.date).year(),
            show: true
          })
        }
      });

      this.calculatedCard.formattedPayments = this.calculatedCard.formattedPayments.sort(
        (a, b) => new Date(b.payment.date).getTime() - new Date(a.payment.date).getTime())
    })
  }

  private checkIfDateExist(formattedPayment: IFormattedPayment): boolean {
    return this.paymentDates.some(value => this.checkDates(value, formattedPayment))
  }

  private checkDates(value: { month: number, year: number, show: boolean }, formattedPayment: IFormattedPayment): boolean {
    return (
      value.month === moment(formattedPayment.payment.date).month() &&
      value.year === moment(formattedPayment.payment.date).year())
  }
}
