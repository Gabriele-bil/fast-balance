import { Component, OnDestroy } from '@angular/core';
import { AuthService } from "@shared/services/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-dashboard-sidebar',
  template: `
    <div
      id="container"
      class="d-flex flex-column justify-content-between align-items-center py-3"
    >
      <a routerLink="/dashboard/welcome" routerLinkActive="active p-1">
        <img
          src="/assets/images/brand/icon.png"
          alt="Brand icon"
          class="brand"
        />
      </a>

      <div class="profile-container d-flex flex-column">
        <a routerLink="/dashboard/settings" routerLinkActive="active p-1">
          <img src="/assets/images/user-icon.png" alt="User image icon"
          /></a>

        <button class="btn" (click)="logout()">
          <img src="/assets/images/icons/logout.png" alt="logout" class="mt-3"/>
        </button>
      </div>
    </div>
  `,
  styles: [
    // language=scss
    `
      #container {
        width: 80px;
        height: 100vh;
        background-color: #fafafa;

        img {
          width: 2.5rem;
        }

        .active {
          border-bottom: 1px solid #111112;
        }
      }
    `,
  ],
})
export class DashboardSidebarComponent implements OnDestroy {
  private logoutSubscription$: Subscription | undefined;

  constructor(private readonly authService: AuthService) {
  }

  ngOnDestroy(): void {
    this.logoutSubscription$?.unsubscribe();
  }

  public logout(): void {
    this.logoutSubscription$ = this.authService.signOut().subscribe();
  }

}
