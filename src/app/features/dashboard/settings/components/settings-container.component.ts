import { Component } from '@angular/core';

@Component({
  selector: 'app-settings-container',
  template: `
    <div id="container" class="d-flex justify-content-center p-5">
      <div class="background-white w-100 p-4">
        <h1>Impostazioni Account</h1>
        <div class="d-flex flex-row-reverse w-100">
          <button class="btn btn-primary" (click)="edit = !edit">
            {{ edit ? 'Viusalizza' : 'Modifica' }}
          </button>
        </div>
        <div class="row w-100 justify-content-between mt-5">
          <form class="col-8">
            <div class="row">
              <div class="col">
                <input type="text" class="form-control" placeholder="Nome" [disabled]="!edit"/>
              </div>
              <div class="col">
                <input type="text" class="form-control" placeholder="Cognome" [disabled]="!edit"/>
              </div>
            </div>

            <div class="row my-5">
              <div class="col">
                <input type="text" class="form-control" placeholder="Username" [disabled]="!edit"/>
              </div>
              <div class="col">
                <button class="btn btn-secondary h-100" [disabled]="!edit">Reimposta password</button>
              </div>
            </div>

            <div class="row my-5">
              <div class="col">
                <input type="text" class="form-control" placeholder="Lavoro" [disabled]="!edit"/>
              </div>
              <div class="col-3">
                <select class="form-control" [disabled]="!edit">
                  <option value="" disabled selected>Genere</option>
                  <option>Uomo</option>
                  <option>Donna</option>
                  <option>Altro</option>
                </select>
              </div>
            </div>

            <div class="row my-5">
              <div class="col-3">
                <input type="number" class="form-control" placeholder="Età" [disabled]="!edit"/>
              </div>
              <div class="col">
                <input type="text" class="form-control" placeholder="Telefono" [disabled]="!edit"/>
              </div>
            </div>

            <div class="row my-5">
              <div class="col">
                <input type="text" class="form-control" placeholder="Città" [disabled]="!edit"/>
              </div>
              <div class="col">
                <input type="text" class="form-control" placeholder="Via" [disabled]="!edit"/>
              </div>
              <div class="col">
                <input type="text" class="form-control" placeholder="CAP" [disabled]="!edit"/>
              </div>
            </div>

            <div class="row my-5">
              <div class="col">
                <textarea class="form-control" placeholder="Biografia" [disabled]="!edit"></textarea>
              </div>
            </div>
          </form>

          <div class="col-4">
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
          </div>
        </div>

        <div class="d-flex justify-content-between align-items-center">
          <a class="btn btn-light py-2 px-4">Annulla</a>
          <button class="btn btn-dark py-2 px-4">Salva</button>
        </div>
      </div>
    </div>
  `,
  styles: [
    // language=scss
    `
      #container {
        width: calc(100vw - 80px);
        min-height: 100vh;

        .background-white {
          background-color: #fafafa;

          textarea {
            min-height: 80px;
          }

          .profile-summary {
            border: 1px solid #111112;

            .profile-img {
              img {
                width: 5rem;
              }
            }
          }
        }
      }
    `,
  ],
})
export class SettingsContainerComponent {
  public edit = false;

}
