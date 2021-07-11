import { Injectable } from '@angular/core';
import {
  NgbModal,
  NgbModalOptions,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '@shared/components/modal.component';
import { ModalData } from '@shared/models/modal.model';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private readonly modalService: NgbModal) {}

  public openModal(data: ModalData): NgbModalRef {
    const modalRef = this.modalService.open(ModalComponent, { centered: true });
    modalRef.componentInstance.data = data;

    return modalRef;
  }

  public openCustom(
    customComponent: unknown,
    data?: unknown,
    option: NgbModalOptions = { centered: true }
  ): NgbModalRef {
    const modalRef = this.modalService.open(customComponent, option);
    modalRef.componentInstance.data = data;

    return modalRef;
  }
}
