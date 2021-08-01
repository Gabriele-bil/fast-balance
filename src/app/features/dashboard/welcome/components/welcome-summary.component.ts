import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome-summary',
  template: `
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Sommario</h2>
      </div>
      <div class="card-body">
        <div class="total d-inline-block p-2">
          <h3 class="mb-0">Totale:
            <app-money [quantity]="233"></app-money>
          </h3>
        </div>

        <div class="row mt-5">
          <div class="cards col-12 col-md-6">
            <h4>Carte</h4>
            <div class="d-flex justify-content-between">
              <h5>Nome carta</h5>
              <app-money [quantity]="30"></app-money>
            </div>
          </div>

          <div class="col-12 col-md-6">
            <h4>Ultimi movimenti</h4>
            <div class="d-flex justify-content-between">
              <div class="d-flex">
                <h5 class="pe-3">01/08/2021</h5>
                <h5>Pagamento di test</h5>
              </div>
              <app-money [quantity]="-50"></app-money>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    //language=scss
    `
    .card {
      .total {
        border: 1px solid #111112;
      }

      .cards {
        border-right: 1px solid #111112;
      }
    }
    `]
})
export class WelcomeSummaryComponent {
}
