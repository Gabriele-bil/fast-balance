import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalData } from '@shared/models/modal.model';

@Component({
  selector: 'app-modal',
  template: `
    <div id="container" class="p-4 text-center">
      <h3>{{ data.title }}</h3>

      <p>{{ data.description }}</p>

      <div class="d-flex align-items-center justify-content-between mt-4">
        <button class="btn btn-secondary px-4" (click)="activeModal.close()">
          {{ data.cancelButton }}
        </button>
        <button class="btn btn-dark px-4" (click)="confirm.emit(true)">
          {{ data.confirmButton }}
        </button>
      </div>
    </div>
  `,
  styles: [],
})
export class ModalComponent {
  @Input() data: ModalData = {} as ModalData;
  @Output() confirm: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public readonly activeModal: NgbActiveModal) {}
}
