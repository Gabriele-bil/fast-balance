import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-top-bar',
  template: `
    <div id="container" class="w-100 d-flex justify-content-between align-items-center px-3">
      <h1 class="mb-0">Fast Balance</h1>
      <div class="card-user d-flex align-items-center p-2">
        <div class="image-container p-1 me-1">
          <img src="/assets/images/user-icon.png" alt="User image icon">
        </div>
        <h2 class="mb-0 mx-2">Nome utente</h2>
        <i class="bi bi-arrow-down-short"></i>
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
          border: 2px solid #111112;
          cursor: pointer;

          &:hover {
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
            font-size: 1.5rem;
          }
        }
      }
    `]
})
export class DashboardTopBarComponent {
}
