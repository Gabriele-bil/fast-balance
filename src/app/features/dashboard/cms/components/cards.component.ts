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
      <div class="background-white w-100 p-1">
        <div class="bg-dark text-white p-3">
          <h2 class="mt-3">Le tue carte</h2>
          <div class="row">
            <div class="col-1 d-none d-md-flex"></div>
            <div class="col">Nome</div>
            <div class="col">Credito</div>
            <div class="col">Movimenti effettuati</div>
            <div class="col"></div>
            <div class="col-2 d-none d-md-flex"></div>
          </div>

          <div class="row card-container my-3 align-items-center cursor-pointer" *ngFor="let card of cards" >
            <div class="col-1 d-none d-md-flex"><img [src]="card.iconUrl" alt="card icon" class="img-fluid"></div>
            <div class="col">{{ card.name }}</div>
            <div class="col">{{ card.balance }}</div>
            <div class="col">{{ card.payments?.length ? card.payments?.length : 0 }}</div>
            <div class="col">
              <button class="btn btn-primary" [routerLink]="['edit/', card.id]">Dettagli</button>
            </div>
            <div class="col-2 d-none d-md-flex">
              <button class="btn btn-danger" (click)="deleteCard(card.id)">Elimina</button>
            </div>
          </div>
        </div>

        <button class="btn btn-primary position-fixed my-2">
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

        @media (max-width: 768px) {
          width: 100vw;
          margin-bottom: 50px;
        }

        h1 {
          font-size: 48px;
        }

        .card-container {
          border-bottom: 1px solid #fafafa;
        }

        button {
          bottom: 3rem;
          right: 3rem;

          @media (max-width: 768px) {
            position: static !important;
          }
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
        this.cards = cards ? cards.sort((a, b) => a.name > b.name ? 1 : -1) : [];
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
}
