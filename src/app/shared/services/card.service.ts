import { Inject, Injectable } from '@angular/core';
import { GenericService } from "@shared/services/generic.service";
import { Card } from "@shared/models/card.model";
import { AngularFirestore } from "@angular/fire/firestore";
import { Payment } from "@shared/models/payment.model";
import { exhaustMap, first } from "rxjs/operators";
import { Observable } from "rxjs";

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
        // @ts-ignore
        const payments = card.payments ? [...card.payments] : [];
        payments.push(payment);
        return this.update(cardId, { payments } as Card);
      })
    )
  }

  protected getCollectionName(): string {
    return "cards";
  }
}
