import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Payment } from "@shared/models/payment.model";
import { Card } from "@shared/models/card.model";

@Component({
  selector: 'app-payment-edit',
  template: `
    <div>
      <ngb-accordion [activeIds]="openAccordion ? 'payment'  : ''">
        <ngb-panel id="payment" title="Aggiungi nuovo movimento">
          <ng-template ngbPanelContent>
            <div class="card">
              <div class="card-body" *ngIf="cards.length">
                <form [formGroup]="paymentForm">
                  <div class="row mb-4">
                    <label class="col-12 col-lg-6 col-xl-4">
                      <span>Quantità</span>
                      <input type="number" class="form-control" formControlName="quantity">
                    </label>

                    <label class="col-12 col-lg-6 mt-4 mt-lg-0 col-xl-4">
                      <span>Data</span>
                      <input type="datetime-local" class="form-control" formControlName="date">
                    </label>

                    <label class="col-12 col-xl-4 mt-4 mt-xl-0">
                      <span>Carta</span>
                      <select class="form-select form-control" id="autoSizingSelect" formControlName="card">
                        <option *ngFor="let card of cards" [value]="card.id">{{ card.name }}</option>
                      </select>
                    </label>
                  </div>

                  <div class="row mb-4">
                    <label class="col-12 col-xl-8">
                      <span>Note</span>
                      <textarea class="form-control" formControlName="note"></textarea>
                    </label>
                  </div>

                  <div class="row mb-4 align-items-center">
                    <div class="col-12 col-lg-3">
                      <div class="form-check d-flex align-items-center m-0">
                        <label class="form-check-label ps-2">
                          <input class="form-check-input" type="checkbox" formControlName="isRecurrence"
                                 (click)="handleRecurrence()">
                          <span>Movimento ricorrente</span>
                        </label>
                      </div>
                    </div>

                    <label class="col-12 col-lg-5 mt-3 mt-lg-0">
                      <span>Ricorrenza in giorni</span>
                      <input type="number" class="form-control" formControlName="recurrenceInDays">
                    </label>
                  </div>

                  <div class="row mb-4 align-items-center">
                    <label class="col-12 col-lg-8">
                      <span>Tags</span>
                      <input type="text" class="form-control" formControlName="tags">
                    </label>

                    <label class="col-12 col-lg-4 mt-4 mt-lg-0">
                      <span>Importanza</span>
                      <select class="form-select form-control" formControlName="importance">
                        <option value="low">Bassa</option>
                        <option value="medium">Media</option>
                        <option value="high">Alta</option>
                      </select>
                    </label>
                  </div>

                  <app-confirm-buttons [disable]="paymentForm.invalid || loading" (save)="savePayment()" (cancel)="clearForm()"></app-confirm-buttons>
                </form>
              </div>

              <div class="card-body" *ngIf="!cards.length">
                <h3>Devi aggiungere prima una carta</h3>
                <a routerLink="/dashboard/cms/cards/add">Vai alla sezione per aggiungere una carta</a>
              </div>
            </div>
          </ng-template>
        </ngb-panel>
      </ngb-accordion>
    </div>
  `,
  styles: []
})
export class PaymentEditComponent implements OnInit {
  @Input() cards: Card[] = [];
  @Input() openAccordion: boolean = false;
  @Input() payment: Payment = Payment.Build({} as Payment);
  @Input() loading = false;
  @Output() save = new EventEmitter<{ card: string, payment: Payment }>();

  public paymentForm: FormGroup = new FormGroup({});

  constructor(private readonly fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initForm();
    this.handleRecurrence();
  }

  public handleRecurrence(): void {
    setTimeout(() => this.paymentForm.get('isRecurrence')?.value
      ? this.paymentForm.get('recurrenceInDays')?.enable()
      : this.paymentForm.get('recurrenceInDays')?.disable(), 0);
  }

  public savePayment(): void {
    this.loading = true;
    const value = this.paymentForm.value;
    const payment = {
      id: this.payment.id,
      quantity: value.quantity,
      currency: 'eur',
      date: value.date,
      note: value.note,
      tags: value?.tags?.split(','),
      importance: value?.importance,
      isRecurrence: value?.isRecurrence,
      recurrenceInDays: value.recurrenceInDays ? value.recurrenceInDays : 0
    } as Payment;

    this.save.emit({ card: value.card, payment })
  }

  public clearForm(): void {
    this.paymentForm.reset();
  }

  private initForm(): void {
    this.paymentForm = this.fb.group({
      quantity: [this.payment.quantity, Validators.required],
      date: [this.payment.date, Validators.required],
      card: ['', Validators.required],
      note: [this.payment.note, Validators.required],
      isRecurrence: [this.payment.isRecurrence],
      recurrenceInDays: [this.payment.recurrenceInDays],
      tags: [this.payment.tags.join(', ')],
      importance: [this.payment.importance]
    });

    if (this.payment.id) {
      const card = this.cards.find(c => c.payments.find(p => p.id === this.payment.id));
      this.paymentForm.patchValue({ 'card': card?.id });
    }
  }
}
