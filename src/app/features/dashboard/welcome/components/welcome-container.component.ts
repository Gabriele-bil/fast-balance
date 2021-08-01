import { Component, OnInit } from '@angular/core';
import { MeService } from "@shared/services/me.service";
import { Observable } from "rxjs";
import { Card } from "@shared/models/card.model";

@Component({
  selector: 'app-welcome-container',
  template: `
    <div id="container" class="p-3 p-md-4">
      <div class="mb-3">
        <app-payment-edit></app-payment-edit>
      </div>
      <div *ngIf="cards$ | async as cards">
        <app-welcome-summary [cards]="cards"></app-welcome-summary>
      </div>
    </div>
  `,
  styles: [
    //language=scss
    `
      #container {
        width: calc(100vw - 80px);
      }
    `]
})
export class WelcomeContainerComponent implements OnInit {
  public cards$: Observable<Card[]> | undefined;

  constructor(private readonly meService: MeService) {
  }

  ngOnInit(): void {
    this.cards$ = this.meService.getCards();
  }

}
