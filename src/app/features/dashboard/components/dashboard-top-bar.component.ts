import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-top-bar',
  template: `
    <div
      id="container"
      class="w-100 d-flex justify-content-between align-items-center px-3"
    >
      <h1 class="mb-0 cursor-pointer" routerLink="/dashboard">Fast Balance</h1>

      <div class="dropdown">
        <button
          class="btn dropdown-toggle card-user d-flex align-items-center justify-content-center"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <div class="image-container p-1 me-1">
            <img src="/assets/images/user-icon.png" alt="User image icon" />
          </div>
          <h2 class="mb-0 mx-2">Nome utente</h2>
          <i class="bi bi-caret-down-fill mt-1"></i>
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li><a class="dropdown-item" routerLink="settings">Action</a></li>
          <li><a class="dropdown-item" href="#">Another action</a></li>
          <li><a class="dropdown-item" href="#">Something else here</a></li>
        </ul>
      </div>
    </div>
  `,
  styles: [
    //language=scss
    `
      #container {
        height: 100px;
        background-color: #fafafa;

        .card-user {
          cursor: pointer;

          &:hover,
          &:focus {
            transition: ease-in-out 0.3s;
            box-shadow: 2px 2px 7px #888888;
          }

          .image-container {
            border: 1px solid #111112;
            border-radius: 50%;

            img {
              width: 2rem;
            }
          }

          i {
            font-size: 1rem;
          }

          &.dropdown-toggle {
            width: 240px;

            &::after {
              display: none;
            }
          }
        }

        .dropdown-menu {
          width: 240px;
        }
      }
    `,
  ],
})
export class DashboardTopBarComponent {}
