import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { UserService } from "./user.service";
import { BehaviorSubject, from, Observable, of } from "rxjs";
import { catchError, switchMap, tap } from "rxjs/operators";
import { IUser, User } from "../models/user.model";
import { SnackbarService } from "@shared/services/snackbar.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser$ = new BehaviorSubject<User | undefined>(undefined);
  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth,
    private router: Router,
    private userService: UserService,
    private snackbarService: SnackbarService
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
      tap(this.updateCurrentUser),
      catchError(error => this.catchError(error))
    );
  }

  public update(id: string, item: User): Observable<User | undefined> {
    return this.userService.update(id, item).pipe(
      tap(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUser$!.next(user as User);
      }),
      catchError(error => this.catchError(error))
    )
  }

  public login(email: string, password: string): Observable<User | undefined> {
    return from(this.auth.signInWithEmailAndPassword(email, password)).pipe(
      switchMap(userRes => this.userService.getUserByEmail(userRes.user?.email)),
      tap(this.updateCurrentUser),
      catchError(error => this.catchError(error))
    );
  }

  public forgotPassword(passwordResetEmail: string): Observable<void> {
    return from(this.auth.sendPasswordResetEmail(passwordResetEmail))
  }

  public signOut(): Observable<void> {
    return from(this.auth.signOut()).pipe(
      tap(() => {
        localStorage.removeItem('user');
        this.currentUser$?.next(undefined);
        this.router.navigateByUrl('');
      }),
      catchError(error => this.catchError(error))
    )
  }

  private updateCurrentUser = (user: User | undefined) => {
      this.currentUser$!.next(user as User);
      this.router.navigateByUrl('/dashboard');
  };

  private catchError(error: string): Observable<any> {
    this.snackbarService.openSnackBar(error);
    return of(null);
  }
}
