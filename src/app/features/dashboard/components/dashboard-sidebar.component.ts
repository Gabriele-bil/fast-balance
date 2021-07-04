import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-sidebar',
  template: `
    <div id="container">

    </div>
  `,
  styles: [
    // lang scss
    `
      #container {
        width: 300px;
        height: calc(100vh - 100px);
        background-color: #cdcdcd;
      }
    `]
})
export class DashboardSidebarComponent {
}
