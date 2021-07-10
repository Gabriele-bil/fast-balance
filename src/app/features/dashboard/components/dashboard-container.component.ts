import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-container',
  template: `
    <div id="container" class="d-flex">
      <app-dashboard-sidebar></app-dashboard-sidebar>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    //language=scss
    `
      #container {
        width: 100vw;
        min-height: 100vh;
        background-color: #111112;
      }
    `,
  ],
})
export class DashboardContainerComponent {}
