import { Component, Input } from '@angular/core';
import { IFormattedPayment, Importance } from "@shared/models/payment.model";

@Component({
  selector: 'app-welcome-payment-single',
  template: `
    <div class="row align-items-center text-center pb-2" [title]="item.cardName">
      <div class="col-1"><img [src]="item.cardIcon" alt="icon url"></div>
      <div class="col-2">{{ item.payment.date | date:'short' }}</div>
      <div class="col"
           [title]="item.payment.note">{{ (item.payment.note.length > 35) ? (item.payment.note | slice:0:35) + '..' : (item.payment.note) }}</div>
      <div class="col" [title]="tags">{{ (tags.length > 35) ? (tags | slice:0:35) + '..' : (tags) }}</div>
      <div class="col-2">{{ importance }}</div>
      <div class="col-2">
        <app-money [quantity]="item.payment.quantity"></app-money>
      </div>
    </div>
  `,
  styles: [
    //language=scss
    `
      .row {
        border-bottom: 1px solid #111112;

        img {
          width: 2rem;
          height: 2rem;
        }
      }
    `
  ]
})
export class WelcomePaymentSingleComponent {
  @Input() item!: IFormattedPayment;

  get importance(): string {
    switch (this.item.payment.importance) {
      case Importance.LOW:
        return 'Bassa';
      case Importance.MEDIUM:
        return 'Media';
      case Importance.HIGH:
        return 'Alta'
    }
  }

  get tags(): string {
    return this.item.payment.tags.join();
  }
}
