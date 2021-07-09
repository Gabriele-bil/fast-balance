import { Inject, Injectable } from '@angular/core';
import { GenericService } from "@shared/services/generic.service";
import { User } from "@shared/models/user.model";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class AccountService extends GenericService<User> {

  constructor(@Inject(AngularFirestore) firestore: AngularFirestore) {
    super(firestore);
  }

  protected getCollectionName(): string {
    return "accounts";
  }
}
