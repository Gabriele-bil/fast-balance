import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardService } from "@shared/services/card.service";
import { SpinnerService } from "@shared/services/spinner.service";
import { Card } from "@shared/models/card.model";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-cards',
  template: `
    <div id="container" class="d-flex justify-content-center p-3 p-md-4">
      <div class="background-white w-100 p-3">
        <h1 class="mt-3">Le tue carte</h1>

        <table class="table table-dark table-hover mt-5">
          <thead>
          <tr>
            <td>id</td>
            <td>nome</td>
            <td>prova</td>
            <td>prova1</td>
          </tr>
          </thead>

          <tbody>
          <tr>
            <td>1</td>
            <td>Pino</td>
            <td>miao</td>
            <td>prasdasdsva1</td>
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
      }
    `]
})
export class CardsComponent implements OnInit, OnDestroy {

  public cards: Card[] = [];
  private getCardsSubscription: Subscription | undefined;

  constructor(
    private readonly cardService: CardService,
    private readonly spinnerService: SpinnerService
  ) {
    this.spinnerService.showSpinner$.next(true);
  }

  ngOnInit(): void {
    this.getCardsSubscription = this.cardService.getAll().subscribe(
      cards => {
        this.cards = cards ? cards : [];
        this.spinnerService.showSpinner$.next(false);
      },
      () => this.spinnerService.showSpinner$.next(false))
  }

  ngOnDestroy(): void {
    this.getCardsSubscription ? this.getCardsSubscription.unsubscribe() : null;
  }

}
