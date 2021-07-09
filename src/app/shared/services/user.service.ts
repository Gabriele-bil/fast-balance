import { Inject, Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { from, Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { User, UserCredential } from "../models/user.model";
import { GenericService } from "@shared/services/generic.service";

@Injectable({
  providedIn: 'root'
})
export class UserService extends GenericService<User>{

  constructor(@Inject(AngularFirestore) firestore: AngularFirestore) {
    super(firestore);
  }

  createUser(username: string, email: string): Observable<UserCredential | undefined> {
    const createdDate = new Date().toISOString();
    return from(this.firestore.collection(this.getCollectionName()).add({ username, email, createdDate })).pipe(
      switchMap(docRef => this.firestore.collection(this.getCollectionName()).doc<UserCredential>(docRef.id).valueChanges())
    );
  }

  getUserByEmail(email: string | null | undefined): Observable<UserCredential | undefined> {
    return this.firestore.collection<UserCredential>(this.getCollectionName(), ref => ref.where('email', '==', email).limit(1)).valueChanges().pipe(
      map(users => users[0] as UserCredential | undefined)
    )
  }

  protected getCollectionName(): string {
    return "users";
  }
}
