import { Component, HostListener, Input } from '@angular/core';
import { IFormattedPayment, Importance } from "@shared/models/payment.model";

@Component({
  selector: 'app-welcome-payment-single',
  template: `
    <div class="row align-items-center text-md-center pb-2" [title]="item.cardName">
      <div class="col-6 col-md-1 mb-3 mb-md-0"><img [src]="item.cardIcon" alt="icon url"></div>
      <div class="col-6 col-md-2 mb-3 mb-md-0">{{ item.payment.date | date:'short' }}</div>
      <div class="col-12 col-md mb-3 mb-md-0"
           [title]="item.payment.note">{{ (item.payment.note.length > 35 && innerWidth > 768) ? (item.payment.note | slice:0:35) + '..' : (item.payment.note) }}</div>
      <div class="col-12 col-md mb-3 mb-md-0"
           [title]="tags">{{ (tags.length > 35 && innerWidth > 768) ? (tags | slice:0:35) + '..' : (tags) }}</div>
      <div class="col-6 col-md-1 mb-3 mb-md-0 d-flex"><span class="d-flex d-md-none pe-2 text-info">Importanza:</span>{{ importance }}</div>
      <div class="col-6 col-md-2 mb-3 mb-md-0">
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

  public innerWidth = window.innerWidth;

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

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
  }

}