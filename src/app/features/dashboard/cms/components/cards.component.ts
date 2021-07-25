import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardService } from "@shared/services/card.service";
import { SpinnerService } from "@shared/services/spinner.service";
import { Card } from "@shared/models/card.model";
import { Subscription } from "rxjs";
import { AuthService } from "@shared/services/auth.service";
import { User } from "@shared/models/user.model";

@Component({
  selector: 'app-cards',
  template: `
    <div id="container" class="d-flex justify-content-center p-3 p-md-4">
      <div class="background-white w-100 p-3">
        <h1 class="mt-3">Le tue carte</h1>

        <table class="table table-dark table-hover mt-5">
          <thead>
          <tr class="text-center">
            <td></td>
            <td>Nome</td>
            <td>Credito</td>
            <td>Budget limite</td>
            <td>Movimenti effettuati</td>
            <td></td>
            <td></td>
          </tr>
          </thead>

          <tbody>
          <tr *ngFor="let card of cards" class="text-center">
            <td><img [src]="card.iconUrl" alt="card icon" class="img-fluid"></td>
            <td>{{ card.name }}</td>
            <td>{{ card.balance }}</td>
            <td>{{ card.monthlyBudget }}</td>
            <td>{{ card.payments?.length ? card.payments?.length : 0 }}</td>
            <td>
              <button class="btn btn-primary" [routerLink]="['edit/', card.id]">Dettagli</button>
            </td>
            <td>
              <button class="btn btn-danger" (click)="deleteCard(card.id)">Elimina</button>
            </td>
          </tr>
          </tbody>
        </table>

        <button class="btn btn-primary position-fixed">
          <a routerLink="add" class="text-white text-decoration-none">
            Aggiungi nuova carta
          </a>
        </button>
      </div>
    </div>
  `,
  styles: [
    //language=scss
    `
      #container {
        width: calc(100vw - 80px);
        min-height: 100vh;

        h1 {
          font-size: 48px;
        }

        button {
          bottom: 3rem;
          right: 3rem;
        }

        img {
          width: 2rem;
          height: 2rem;
        }
      }
    `]
})
export class CardsComponent implements OnInit, OnDestroy {

  public cards: Card[] = [];
  private getCardsSubscription: Subscription | undefined;
  private currentUser!: User;

  constructor(
    private readonly cardService: CardService,
    private readonly spinnerService: SpinnerService,
    private readonly authService: AuthService
  ) {
    this.spinnerService.showSpinner$.next(true);
  }

  ngOnInit(): void {
    this.authService.me.subscribe(user => this.currentUser = user);
    this.getCardsSubscription = this.cardService.getAll().subscribe(
      cards => {
        this.cards = cards ? cards.sort((a, b) => this.sortCards(a, b)) : [];
        this.spinnerService.showSpinner$.next(false);
      },
      () => this.spinnerService.showSpinner$.next(false))
  }

  ngOnDestroy(): void {
    this.getCardsSubscription ? this.getCardsSubscription.unsubscribe() : null;
  }

  public deleteCard(id: string | undefined): void {
    this.spinnerService.showSpinner$.next(true);
    this.cardService.delete(id as string).subscribe(
      () => {
        const cards = this.currentUser.cards.filter(card => card.id !== id);
        // @ts-ignore
        this.authService.update(this.currentUser.id, { cards }).subscribe();
        this.spinnerService.showSpinner$.next(false);
      },
      () => this.spinnerService.showSpinner$.next(false)
    )
  }

  private sortCards(a: Card, b: Card): number {
    return a.name > b.name ? 1 : - 1;
  }
}
