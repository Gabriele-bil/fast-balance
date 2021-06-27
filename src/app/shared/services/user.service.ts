import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) {
  }

  createUser(email: string, password: string): void {
    this.firestore.collection('user').add({ email, password })
      .then(result => localStorage.setItem('user', JSON.stringify({ id: result.id, email })))
      .catch(error => console.log(error));
  }
}
