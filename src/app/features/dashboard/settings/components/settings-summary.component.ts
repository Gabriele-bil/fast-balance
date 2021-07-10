import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from "@shared/models/user.model";

@Component({
  selector: 'app-settings-summary',
  template: `
    <div class="d-flex flex-column align-items-center profile-summary py-5">
      <div class="form-group profile-img mb-3">
        <label class="text-center" [ngClass]="edit ? 'cursor-pointer' : 'cursor-not-allowed' ">
          <img [src]="user.pictureUrl ? user.pictureUrl : '/assets/images/user-icon.png'" alt="User icon">
          <h2 [ngClass]="{ 'text-secondary': !edit }">Cambia immagine</h2>
          <input type="file" class="form-control-file d-none" [disabled]="!edit" (change)="uploadFile.emit($event)">
        </label>
      </div>
      <div class="d-flex flex-column">
        <h3>Carte registrate: 5</h3>
        <h3>Movimenti effettuati: 13042,04 €</h3>
        <h3>Data di creazione dell'account: {{ user.createdDate | date:('dd-MM-YYYY') }}</h3>
        <button class="btn btn-secondary align-self-center mt-3">Aggiungi nuova carta</button>
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
            max-width: 70%;
          }
        }
      }
    `
  ]
})
export class SettingsSummaryComponent {
  @Input() edit: boolean = false;
  @Input() user: User = {} as User;
  @Output() uploadFile = new EventEmitter();
}
