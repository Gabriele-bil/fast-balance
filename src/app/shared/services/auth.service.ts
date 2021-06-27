import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { UserService } from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone,
    private userService: UserService
  ) {
  }

  public signup(email: string, password: string): void {
    this.auth.createUserWithEmailAndPassword(email, password)
      .then(() =>  this.userService.createUser(email, password))
      .catch(error => console.log(error));
  }
}
