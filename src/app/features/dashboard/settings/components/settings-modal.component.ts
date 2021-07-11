import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-settings-modal',
  template: `
    <div id="container" class="p-4 text-center">
      <h3>Perderai tutte le modifiche effettuate <br>Sei sicuro di voler uscire?</h3>

      <div class="d-flex align-items-center justify-content-between mt-4">
        <button class="btn btn-secondary px-4" (click)="activeModal.close()">No</button>
        <button class="btn btn-dark px-4" (click)="confirm.emit(true)">Si</button>
      </div>
    </div>
  `,
  styles: []
})
export class SettingsModalComponent {
  @Output() confirm: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public readonly activeModal: NgbActiveModal) {
  }
}
