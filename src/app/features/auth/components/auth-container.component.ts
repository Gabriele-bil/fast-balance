import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-container',
  template: `
      <div class="wrapper d-flex align-items-center justify-content-center">
          <div class="card p-3">
              <h1 class="text-center mb-4">Fast Balance</h1>
              <router-outlet></router-outlet>
          </div>
      </div>
  `,
  styles: [
    //language=scss
    `
      .wrapper {
        width: 100vw;
        min-height: 100vh;
        background-color: #111112;

        h1 {
          font-size: 2.5rem;
          font-weight: 600;
        }

        .card {
          width: 720px;

          @media (max-width: 512px) {
            max-width: 100%;
          }
        }
      }
    `]
})
export class AuthContainerComponent {
}
