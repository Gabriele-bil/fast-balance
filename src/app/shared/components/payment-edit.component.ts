import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-edit',
  template: `
    <div class="card">
      <div class="card-header">
        <h2 class="card-title mb-0">Aggiungi nuovo movimento</h2>
      </div>
      <div class="card-body">
        <form>
          <div class="row mb-4">
            <label class="col-12 col-lg-6 col-xl-4">
              <span>Quantità</span>
              <input type="number" class="form-control">
            </label>

            <label class="col-12 col-lg-6 col-xl-4">
              <span>Data</span>
              <input type="date" class="form-control">
            </label>

            <label class="col-12 col-xl-4">
              <span>Carta</span>
              <select class="form-select form-control" id="autoSizingSelect">
                <option value="low">Bassa</option>
                <option value="medium">Media</option>
                <option value="heigh">Alta</option>
              </select>
            </label>
          </div>

          <div class="row mb-4">
            <label class="col-12 col-xl-8">
              <span>Note</span>
              <textarea class="form-control"></textarea>
            </label>
          </div>

          <div class="row mb-4 align-items-center">
            <div class="col-12 col-lg-3">
              <div class="form-check d-flex align-items-center m-0">
                <label class="form-check-label ps-2" for="inlineFormCheck">
                  <input class="form-check-input" type="checkbox">
                  <span>Movimento ricorrente</span>
                </label>
              </div>
            </div>

            <label class="col-12 col-lg-5">
              <span>Ricorrenza</span>
              <input type="number" class="form-control">
            </label>
          </div>

          <div class="row mb-4 align-items-center">
            <label class="col-12 col-lg-8">
              <span>Tags</span>
              <input type="text" class="form-control">
            </label>

            <label class="col-12 col-lg-4">
              <span>Importanza</span>
              <select class="form-select form-control" id="autoSizingSelect">
                <option value="low">Bassa</option>
                <option value="medium">Media</option>
                <option value="heigh">Alta</option>
              </select>
            </label>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: []
})
export class PaymentEditComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
