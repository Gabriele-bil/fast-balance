import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { from, Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { UserCredential } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) {
  }

  createUser(username: string, email: string): Observable<UserCredential | undefined> {
    return from(this.firestore.collection('users').add({ username, email })).pipe(
      switchMap(docRef => this.firestore.collection('users').doc<UserCredential>(docRef.id).valueChanges())
    );
  }

  getUserByEmail(email: string | null | undefined): Observable<UserCredential | undefined> {
    return this.firestore.collection<UserCredential>('users', ref => ref.where('email', '==', email).limit(1)).valueChanges().pipe(
      map(users => users[0] as UserCredential | undefined)
    )


  }
}
