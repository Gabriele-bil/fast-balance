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
    return this.getFirestoreCollection().snapshotChanges().pipe(
      map(items => items.map(item => ({ id: item.payload.doc.id, ...item.payload.doc.data() } as unknown as T)))
    );
  }

  getById(id: string): Observable<T | undefined> {
    return from(this.getFirestoreCollection().doc<T>(id).snapshotChanges()).pipe(
      map(item => ({ id: item.payload.id, ...item.payload.data() } as unknown as T))
    )
  }

  create(item: T): Observable<T | undefined> {
    return from(this.getFirestoreCollection().add(item)).pipe(
      switchMap(docRef => this.getById(docRef.id)),
    );
  }

  update(id: string, item: T): Observable<any> {
    return from(this.getFirestoreCollection().doc(id).set(item, { merge: true })).pipe(
      switchMap(() => this.getById(id))
    )
  }

  protected abstract getCollectionName(): string;

  private getFirestoreCollection(): AngularFirestoreCollection {
    return this.firestore.collection<T>(this.getCollectionName());
  }
}
