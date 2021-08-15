import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from "@shared/services/auth.service";
import { Subscription } from "rxjs";
import { ModalService } from "@shared/services/modal.service";
import { User } from "@shared/models/user.model";
import { Payment } from "@shared/models/payment.model";
import { CardService } from "@shared/services/card.service";
import { switchMap } from "rxjs/operators";

@Component({
  selector: 'app-dashboard-container',
  template: `
    <div id="container" class="d-flex">
      <app-dashboard-sidebar (handleLogout)="logout()" (handleNewPayment)="openNewModal()"></app-dashboard-sidebar>
      <div class="margin-sidebar">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [
    //language=scss
    `
      #container {
        width: 100vw;
        min-height: 100vh;
        background-color: #111112;

        .margin-sidebar {
          margin-left: 80px;

          @media (max-width: 768px) {
            margin-left: 0;
          }
        }
      }
    `,
  ],
})
export class DashboardContainerComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  private currentUser!: User;

  constructor(
    private readonly authService: AuthService,
    private readonly modalService: ModalService,
    private readonly cardService: CardService
  ) {
  }

  ngOnInit(): void {
    this.subscriptions.push(this.authService.me.subscribe(currentUser => this.currentUser = currentUser));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

  public logout(): void {
    this.subscriptions.push(this.authService.signOut().subscribe());
  }

  public openNewModal(): void {
    const modalRef = this.modalService.openNewPayment(this.currentUser.cards);
    this.subscriptions.push(modalRef.componentInstance.save.pipe(
      switchMap((result: { card: string, payment: Payment }) =>
        this.cardService.addPayment(result.card, result.payment)
      )
    ).subscribe(() => location.reload()));
  }

}
