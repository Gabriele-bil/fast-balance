import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-buttons',
  template: `
    <div class="d-flex justify-content-between align-items-center mt-3">
      <button class="btn btn-light py-2 px-4" (click)="cancel.emit()">
        Annulla
      </button>
      <button class="btn btn-dark py-2 px-4" (click)="save.emit()" [disabled]="disable">
        Salva
      </button>
    </div>
  `,
  styles: [
  ]
})
export class ConfirmButtonsComponent {
  @Input() disable: boolean = false;
  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();
}
