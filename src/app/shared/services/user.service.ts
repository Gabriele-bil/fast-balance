import { Inject, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { from, Observable } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
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
      switchMap(docRef => this.getCollection().doc<IUser>(docRef.id).snapshotChanges()),
      map(item => ({ id: item.payload.id, ...item.payload.data() } as unknown as User))
    );
  }

  getUserByEmail(email: string | null | undefined): Observable<User> {
    return this.firestore.collection<User>(this.getCollectionName(), ref => ref.where('email', '==', email).limit(1)).snapshotChanges().pipe(
      map(users => ({ id: users[0].payload.doc.id, ...users[0].payload.doc.data() } as unknown as User))
    )
  }

  update(id: string, item: User): Observable<User | undefined> {
    return super.update(id, item).pipe(
      tap(user => localStorage.setItem('user', JSON.stringify(user)))
    );
  }

  protected getCollectionName(): string {
    return "users";
  }

  private getCollection(): AngularFirestoreCollection {
    return this.firestore.collection<User>(this.getCollectionName());
  }
}
