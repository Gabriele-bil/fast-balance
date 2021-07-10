import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-container',
  template: `
    <div id="container" class="d-flex justify-content-center p-5">
      <div class="background-white w-100 p-3">
        <div class="d-flex flex-row-reverse w-100">
          <button class="btn btn-primary">Modifica</button>
        </div>

        <form class="mt-4">
          <div class="row form-row">
            <div class="col">
              <input type="text" class="form-control" placeholder="Nome" />
            </div>
            <div class="col">
              <input type="text" class="form-control" placeholder="Cognome" />
            </div>
          </div>

          <div class="row form-row mt-3">
            <div class="col">
              <input type="text" class="form-control" placeholder="Username" />
            </div>

            <div class="col-2">
              <input type="number" class="form-control" placeholder="Età" />
            </div>

            <div class="col">
              <input type="text" class="form-control" placeholder="Lavoro" />
            </div>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [
    // language=scss
    `
      #container {
        width: calc(100vw - 80px);

        .background-white {
          background-color: #fafafa;
        }
      }
    `,
  ],
})
export class SettingsContainerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
