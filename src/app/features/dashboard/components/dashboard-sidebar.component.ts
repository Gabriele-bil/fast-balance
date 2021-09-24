import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dashboard-sidebar',
  template: `
    <div
      id="container"
      class="d-none d-md-flex flex-column justify-content-between align-items-center py-3 position-fixed"
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

        <a routerLink="/dashboard/tools" class="p-1 pt-3" routerLinkActive="active">
          <img  src="/assets/images/icons/tools.svg" alt="tools">
        </a>
      </div>

      <div class="profile-container d-flex flex-column">
        <div class="d-flex align-items-center justify-content-center cursor-pointer">
          <img src="/assets/images/icons/plus.png" alt="Add new payment" (click)="handleNewPayment.emit()"/>
        </div>

        <a routerLink="/dashboard/settings" class="p-1 pt-3 d-flex align-items-center justify-content-center"
           routerLinkActive="active">
          <img src="/assets/images/user-icon.png" alt="User image icon"/>
        </a>

        <button class="btn" (click)="handleLogout.emit()">
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

          <a routerLink="/dashboard/cms/cards" class="mx-3">
            <img
              src="/assets/images/icons/black-wallet.png"
              alt="Le tue carte"
            />
          </a>

          <a routerLink="/dashboard/tools">
            <img  src="/assets/images/icons/tools.svg" alt="tools">
          </a>
        </div>

        <div class="d-flex align-items-center">
          <img src="/assets/images/icons/plus.png" alt="Add new payment" (click)="handleNewPayment.emit()"/>
        </div>

        <div class="profile-container d-flex align-items-center">
          <a routerLink="/dashboard/settings">
            <img src="/assets/images/user-icon.png" alt="User image icon"
            /></a>

          <button class="btn" (click)="handleLogout.emit()">
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
export class DashboardSidebarComponent {
  @Output() handleLogout = new EventEmitter<void>();
  @Output() handleNewPayment = new EventEmitter<void>();
}
