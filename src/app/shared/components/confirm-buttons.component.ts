import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-buttons',
  template: `
    <div class="d-flex justify-content-between align-items-center mt-3">
      <button class="btn btn-light py-2 px-4" (click)="cancel.emit()">
        Annulla
      </button>
      <app-loading-button [disabled]="disable"
                          [loading]="loading"
                          (clicked)="save.emit()"
                          [text]="'Salva'"
                          [classes]="['btn', 'btn-dark', 'py-2', 'px-4']">
      </app-loading-button>
    </div>
  `,
  styles: []
})
export class ConfirmButtonsComponent {
  @Input() disable = false;
  @Input() loading = false;
  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();
}
