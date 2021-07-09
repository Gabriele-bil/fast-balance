import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { UserService } from "./user.service";
import { BehaviorSubject, from, Observable } from "rxjs";
import { switchMap, tap } from "rxjs/operators";
import { IUser, User } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser$ = new BehaviorSubject<User | undefined>(undefined);

  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth,
    private router: Router,
    private userService: UserService
  ) {
    this.currentUser$.subscribe(user => user ? localStorage.setItem('user', JSON.stringify(user)) : null);
  }

  public signup(username: string, email: string, password: string): Observable<User | undefined> {
    const user = User.Build({ username, email } as IUser);
    return from(this.auth.createUserWithEmailAndPassword(email, password)).pipe(
      switchMap(() => this.userService.createUser(user)),
      tap(this.updateCurrentUser)
    );
  }

  public login(email: string, password: string): Observable<User | undefined> {
    return from(this.auth.signInWithEmailAndPassword(email, password)).pipe(
      switchMap(userRes => this.userService.getUserByEmail(userRes.user?.email)),
      tap(this.updateCurrentUser)
    );
  }

  public forgotPassword(passwordResetEmail: string): Observable<void> {
    return from(this.auth.sendPasswordResetEmail(passwordResetEmail))
  }

  private updateCurrentUser = (user: User | undefined) => {
    this.currentUser$.next(user);
    this.router.navigateByUrl('/dashboard');
  };
}
