import { Injectable } from '@angular/core';
import {
  NgbModal,
  NgbModalOptions,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '@shared/components/modal.component';
import { ModalData } from '@shared/models/modal.model';
import { Router } from "@angular/router";
import { Card } from "@shared/models/card.model";
import { PaymentEditComponent } from "@shared/components/payment-edit.component";

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private readonly modalService: NgbModal, private readonly router: Router,) {}

  public cancelFormtext: ModalData = {
    title: 'Perderai tutte le modifiche effettuate',
    description: 'Sei sicuro di voler uscire?',
    cancelButton: 'No',
    confirmButton: 'Si',
  };

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

  public openNewPayment(cards: Card[]): NgbModalRef {
    const modalRef = this.modalService.open(PaymentEditComponent, { centered: true, size: "xl" });
    modalRef.componentInstance.cards = cards;
    modalRef.componentInstance.openAccordion = true;

    return modalRef;
  }

  public cancelForm(formDirty: boolean, redirectUrl: string): void {
    if (formDirty) {
      const modalRef = this.openModal(this.cancelFormtext);
      modalRef.componentInstance.confirm.subscribe((result: boolean) => {
        if (result) {
          modalRef.close();
        }
        this.router.navigateByUrl(redirectUrl);
      });
    } else {
      this.router.navigateByUrl(redirectUrl);
    }
  }
}
