import { Injectable } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private readonly modalService: NgbModal) { }

  public openCustom(customComponent: unknown, data?: unknown, option: NgbModalOptions = { centered: true }): NgbModalRef {
    const modalRef = this.modalService.open(customComponent, option);
    modalRef.componentInstance.fromParent = data;

    return modalRef;
  }
}
