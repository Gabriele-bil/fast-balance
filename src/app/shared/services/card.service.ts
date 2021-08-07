import { Inject, Injectable } from '@angular/core';
import { GenericService } from "@shared/services/generic.service";
import { Card } from "@shared/models/card.model";
import { AngularFirestore } from "@angular/fire/firestore";
import { Payment } from "@shared/models/payment.model";
import { exhaustMap, first } from "rxjs/operators";
import { Observable, of } from "rxjs";

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
      exhaustMap(card => {
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

  protected getCollectionName(): string {
    return "cards";
  }
}
