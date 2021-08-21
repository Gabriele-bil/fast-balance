import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { from, Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export abstract class GenericService<T> {

  protected constructor(protected readonly firestore: AngularFirestore) {
  }

  getAll(): Observable<T[] | undefined> {
    return this.getFirestoreCollection().get().pipe(
      map((items) => items.docs.map(item => ({ id: item.id, ...item.data() } as unknown as T)))
    );
  }

  getById(id: string): Observable<T | undefined> {
    return from(this.getFirestoreCollection().doc<T>(id).get()).pipe(
      map(item => ({ id: item.id, ...item.data() } as unknown as T))
    )
  }

  create(item: T): Observable<T | undefined> {
    return from(this.getFirestoreCollection().add(item)).pipe(
      switchMap(docRef => this.getById(docRef.id)),
    );
  }

  update(id: string, item: T): Observable<T | undefined> {
    return from(this.getFirestoreCollection().doc(id).set(item, { merge: true })).pipe(
      switchMap(() => this.getById(id))
    )
  }

  delete(id: string): Observable<void> {
    return from(this.getFirestoreCollection().doc(id).delete());
  }

  protected abstract getCollectionName(): string;

  private getFirestoreCollection(): AngularFirestoreCollection {
    return this.firestore.collection<T>(this.getCollectionName());
  }
}
