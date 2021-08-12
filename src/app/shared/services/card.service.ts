import { Inject, Injectable } from '@angular/core';
import { GenericService } from "@shared/services/generic.service";
import { Card } from "@shared/models/card.model";
import { AngularFirestore } from "@angular/fire/firestore";
import { IFormattedPayment, Importance, Payment } from "@shared/models/payment.model";
import { first, switchMap } from "rxjs/operators";
import { Observable, of } from "rxjs";
import moment from "moment";
import { ISummary } from "@shared/models/summary.model";

@Injectable({
  providedIn: 'root'
})
export class CardService extends GenericService<Card> {

  constructor(@Inject(AngularFirestore) firestore: AngularFirestore) {
    super(firestore);
  }

  public addPayment(cardId: string, payment: Payment): Observable<Card | undefined> {
    return this.getById(cardId).pipe(
      first(),
      switchMap(card => {
        if (card) {
          const payments = card.payments ? [...card.payments] : [];
          payments.push(payment);
          const balance = card.balance + payment.quantity;
          return this.update(cardId, { balance, payments } as Card);
        }
        return of(undefined);
      })
    )
  }

  public getPayments(cards: Card[]): { formattedPayments: IFormattedPayment[], summary: ISummary } {
    const formattedPayments: IFormattedPayment[] = [];
    let summary: ISummary = {
      expenses: 0,
      income: 0,
      net: 0,
      unnecessaryExpenses: 0
    };

    cards.forEach(card =>
      card.payments?.forEach(payment => {
        formattedPayments.push({
          payment,
          cardIcon: card.iconUrl,
          cardName: card.name,
        })
        summary = this.setSummary(payment, summary);
        summary.net = summary.income - summary.expenses;
      })
    );
    return { formattedPayments, summary };
  }

  protected getCollectionName(): string {
    return "cards";
  }

  private setSummary(payment: Payment, summary: ISummary): ISummary {
    if (moment(payment.date).month() === moment().month()) {
      payment.quantity < 0
        ? summary.expenses -= payment.quantity
        : summary.income += payment.quantity;

      if (payment.quantity < 0 && payment.importance === Importance.LOW) {
        summary.unnecessaryExpenses -= payment.quantity
      }
    }

    return summary;
  }
}
