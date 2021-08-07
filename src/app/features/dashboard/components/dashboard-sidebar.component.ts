import { Component, OnDestroy } from '@angular/core';
import { AuthService } from "@shared/services/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-dashboard-sidebar',
  template: `
    <div
      id="container"
      class="d-none d-md-flex flex-column justify-content-between align-items-center py-3"
    >
      <div class="d-flex flex-column align-items-center">
        <a routerLink="/dashboard/welcome" class="p-1 pt-3" routerLinkActive="active">
          <img
            src="/assets/images/brand/icon.png"
            alt="Brand icon"
          />
        </a>

        <a routerLink="/dashboard/cms/cards" class="p-1 pt-3" routerLinkActive="active">
          <img
            src="/assets/images/icons/black-wallet.png"
            alt="Le tue carte"
          />
        </a>
      </div>

      <div class="profile-container d-flex flex-column">
        <a routerLink="/dashboard/settings" class="p-1 pt-3" routerLinkActive="active">
          <img src="/assets/images/user-icon.png" alt="User image icon"
          /></a>

        <button class="btn" (click)="logout()">
          <img src="/assets/images/icons/logout.png" alt="logout" class="mt-3"/>
        </button>
      </div>
    </div>

    <div class="mobile-navbar p-1 d-md-none">
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center">
          <div class="mx-3">
            <a routerLink="/dashboard/welcome">
              <img
                src="/assets/images/brand/icon.png"
                alt="Brand icon"
              />
            </a>
          </div>

          <a routerLink="/dashboard/cms/cards">
            <img
              src="/assets/images/icons/black-wallet.png"
              alt="Le tue carte"
            />
          </a>
        </div>

        <div class="profile-container d-flex align-items-center">
          <a routerLink="/dashboard/settings">
            <img src="/assets/images/user-icon.png" alt="User image icon"
            /></a>

          <button class="btn" (click)="logout()">
            <img src="/assets/images/icons/logout.png" alt="logout"/>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    // language=scss
    `
      #container {
        width: 80px;
        height: 100%;
        background-color: #fafafa;

        img {
          width: 2.5rem;
        }
      }

      .active {
        border-bottom: 1px solid #111112;
      }

      .mobile-navbar {
        position: fixed;
        bottom: 0;
        left: 0;
        background-color: #fafafa;
        width: 100vw;
        height: 50px;
        z-index: 10;

        img {
          width: 2rem;
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
