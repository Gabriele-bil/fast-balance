import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Card } from "@shared/models/card.model";
import { AngularFirestore } from "@angular/fire/firestore";
import { switchMap } from "rxjs/operators";
import { AuthService } from "@shared/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class MeService {

  constructor(private readonly firestore: AngularFirestore, private authService: AuthService) {
  }

  public getCards(): Observable<Card[]> {
    return this.authService.me.pipe(
      switchMap(currentUser =>
        this.firestore.collection<Card>('cards', ref => ref.where('userId', '==', currentUser.id)).valueChanges()))
  }
}
