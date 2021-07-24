import { Inject, Injectable } from '@angular/core';
import { GenericService } from "@shared/services/generic.service";
import { Card } from "@shared/models/card.model";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class CardService extends GenericService<Card> {

  constructor(@Inject(AngularFirestore) firestore: AngularFirestore) {
    super(firestore);
  }

  protected getCollectionName(): string {
    return "cards";
  }
}
