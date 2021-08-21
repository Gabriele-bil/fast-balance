import { Inject, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { from, Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { IUser, User } from "../models/user.model";
import { GenericService } from "@shared/services/generic.service";

@Injectable({
  providedIn: 'root'
})
export class UserService extends GenericService<User> {

  constructor(@Inject(AngularFirestore) firestore: AngularFirestore) {
    super(firestore);
  }

  createUser(user: User): Observable<User> {
    const { id, ...dbUser } = user;
    return from(this.getCollection().add({ ...dbUser })).pipe(
      switchMap(docRef => this.getCollection().doc<IUser>(docRef.id).get()),
      map(item => ({ id: item.id, ...item.data() } as unknown as User))
    );
  }

  getUserByEmail(email: string | null | undefined): Observable<User> {
    return this.firestore.collection<User>(this.getCollectionName(), ref => ref.where('email', '==', email).limit(1)).get().pipe(
      map(users => ({ id: users.docs[0].id, ...users.docs[0].data() } as unknown as User))
    )
  }

  protected getCollectionName(): string {
    return "users";
  }

  private getCollection(): AngularFirestoreCollection {
    return this.firestore.collection<User>(this.getCollectionName());
  }
}
