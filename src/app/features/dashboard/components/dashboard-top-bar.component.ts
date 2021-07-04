import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-top-bar',
  template: `
    <div id="container" class="w-100"></div>
  `,
  styles: [
    // lang scss
    `
      #container {
        height: 100px;
        background-color: #fafafa;
      }
    `]
})
export class DashboardTopBarComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
