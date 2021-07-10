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

  private currentUser$: BehaviorSubject<User> | undefined = new BehaviorSubject<User>(User.Build({} as User));
  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth,
    private router: Router,
    private userService: UserService
  ) {
      this.currentUser$?.next(JSON.parse(<string>localStorage.getItem('user')));
      this.currentUser$!.subscribe(user => user ? localStorage.setItem('user', JSON.stringify(user)) : null);
  }

  public get me(): Observable<User> {
    return this.currentUser$!.asObservable() as Observable<User>;
  }

  public signup(username: string, email: string, password: string): Observable<User | undefined> {
    const createdDate = new Date().toISOString();
    const user = User.Build({ username, email, createdDate } as IUser);
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
      this.currentUser$!.next(user as User);
      this.router.navigateByUrl('/dashboard');
  };
}
