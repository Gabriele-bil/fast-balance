import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-summary',
  template: `
    <div class="d-flex flex-column align-items-center profile-summary py-5">
      <div class="form-group profile-img mb-3">
        <label class="text-center cursor-pointer">
          <img src="/assets/images/user-icon.png" alt="User icon">
          <h2 [ngClass]="{ 'text-secondary': !edit }">Cambia immagine</h2>
          <input type="file" class="form-control-file d-none" [disabled]="!edit">
        </label>
      </div>
      <div class="d-flex flex-column">
        <h3>Conti registrati: 2</h3>
        <h3>Carte registrate: 5</h3>
        <h3>Movimenti effettuati: 13042,04 €</h3>
        <h3>Data di creazione dell'account: 09/07/2021</h3>
        <button class="btn btn-secondary align-self-center mt-3">Aggiungi nuovo conto</button>
      </div>
    </div>
  `,
  styles: [
    // language=scss
    `
      .profile-summary {
        border: 1px solid #111112;

        .profile-img {
          img {
            width: 5rem;
          }
        }
      }
    `
  ]
})
export class SettingsSummaryComponent implements OnInit {
  @Input() edit: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

}
