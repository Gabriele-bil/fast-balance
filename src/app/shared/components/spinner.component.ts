import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `
    <div id="container">
      <div class="d-flex justify-content-center align-items-center w-100 h-100">
        <div class="spinner-grow text-light mx-3" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>

        <div class="spinner-grow text-light mx-3" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>

        <div class="spinner-grow text-light mx-3" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  `,
  styles: [
    // language=scss
    `
      #container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.7);
        z-index: 999;
      }
    `
  ]
})
export class SpinnerComponent {
}
