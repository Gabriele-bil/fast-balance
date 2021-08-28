import { Component, Input } from '@angular/core';
import { IFormattedPayment, Importance } from "@shared/models/payment.model";
import { ISummary } from "@shared/models/summary.model";
import moment from "moment";

@Component({
  selector: 'app-welcome-payment-list-container',
  template: `
    <div class="card">
      <div class="card-body">
        <ng-container *ngIf="calculatedCard">
          <div *ngFor="let formattedPayment of calculatedCard.formattedPayments; let i = index" class="my-4">
            <h1 *ngIf="i === 0" class="mb-2 text-center cursor-pointer"
                (click)="toggleMonthlyPayment(formattedPayment)">
              {{ formattedPayment.payment.date | date:'MMMM' | titlecase }}
            </h1>

            <ng-container *ngIf="paymentDates[findPaymentIndex(formattedPayment)].show">
              <app-single [item]="formattedPayment"></app-single>
            </ng-container>

            <div *ngIf="showSummary(i)" class="card summary p-3 mt-3 mb-5">
              <app-balances-summary [summary]="calculateSummary(i)"
                                    [currentDay]="getCurrentMonth(i)  "></app-balances-summary>
            </div>

            <h1 *ngIf="showSummary(i)" class="mb-2 text-center cursor-pointer"
                (click)="toggleMonthlyPayment( calculatedCard.formattedPayments[i + 1])">
              {{ calculatedCard.formattedPayments[i + 1]?.payment?.date | date:'MMMM' | titlecase }}
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
export class ListContainerComponent {
  @Input() calculatedCard: { formattedPayments: IFormattedPayment[], summary: ISummary } = {
    formattedPayments: [],
    summary: {
      expenses: 0,
      income: 0,
      net: 0,
      unnecessaryExpenses: 0
    }
  };
  @Input() paymentDates: { month: number, year: number, show: boolean }[] = [];

  private initialMonthIndex: number = 0;

  public showSummary(index: number): boolean {
    return (!this.calculatedCard.formattedPayments[index + 1] ||
      moment(this.calculatedCard.formattedPayments[index].payment.date).month()
      !== moment(this.calculatedCard.formattedPayments[index + 1]?.payment.date).month());
  }

  public getCurrentMonth(index: number): Date {
    return new Date(this.calculatedCard.formattedPayments[index].payment.date);
  }

  public calculateSummary(index: number): ISummary {
    // TODO fare con una pipe ?
    const summary: ISummary = {
      expenses: 0,
      income: 0,
      net: 0,
      unnecessaryExpenses: 0
    };

    let monthFormattedPayments: IFormattedPayment[] = [...this.calculatedCard.formattedPayments];
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

    this.initialMonthIndex = index + 1 === this.calculatedCard.formattedPayments.length ? 0 : index + 1;

    return summary;
  }

  public toggleMonthlyPayment(formattedPayment: IFormattedPayment): void {
    const findPaymentIndex = this.findPaymentIndex(formattedPayment);
    if (findPaymentIndex >= 0) {
      this.paymentDates[findPaymentIndex].show = !this.paymentDates[findPaymentIndex].show;
    }
  }

  public findPaymentIndex(formattedPayment: IFormattedPayment): number {
    return this.paymentDates.findIndex(value => this.checkDates(value, formattedPayment));
  }

  private checkDates(value: { month: number, year: number, show: boolean }, formattedPayment: IFormattedPayment): boolean {
    return (
      value.month === moment(formattedPayment.payment.date).month() &&
      value.year === moment(formattedPayment.payment.date).year())
  }
}
