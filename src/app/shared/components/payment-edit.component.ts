import { Component, OnInit } from '@angular/core';
import { AuthService } from "@shared/services/auth.service";
import { Observable } from "rxjs";
import { User } from "@shared/models/user.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-payment-edit',
  template: `
    <div class="card" *ngIf="currentUser | async as currentUser">
      <div class="card-header">
        <h2 class="card-title mb-0">Aggiungi nuovo movimento</h2>
      </div>
      <div class="card-body" *ngIf="currentUser.cards.length">
        <form [formGroup]="paymentForm">
          <div class="row mb-4">
            <label class="col-12 col-lg-6 col-xl-4">
              <span>Quantità</span>
              <input type="number" class="form-control" formControlName="quantity">
            </label>

            <label class="col-12 col-lg-6 col-xl-4">
              <span>Data</span>
              <input type="date" class="form-control" formControlName="date">
            </label>

            <label class="col-12 col-xl-4">
              <span>Carta</span>
              <select class="form-select form-control" id="autoSizingSelect" formControlName="card">
                <option *ngFor="let card of currentUser.cards" [value]="card.id">{{ card.name }}</option>
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
                  <input class="form-check-input" type="checkbox" formControlName="isRecurrence">
                  <span>Movimento ricorrente</span>
                </label>
              </div>
            </div>

            <label class="col-12 col-lg-5">
              <span>Ricorrenza in giorni</span>
              <input type="number" class="form-control" formControlName="recurrenceInDays">
            </label>
          </div>

          <div class="row mb-4 align-items-center">
            <label class="col-12 col-lg-8">
              <span>Tags</span>
              <input type="text" class="form-control" formControlName="tags">
            </label>

            <label class="col-12 col-lg-4">
              <span>Importanza</span>
              <select class="form-select form-control" formControlName="importance">
                <option value="low">Bassa</option>
                <option value="medium">Media</option>
                <option value="heigh">Alta</option>
              </select>
            </label>
          </div>
        </form>
      </div>

      <div class="card-body" *ngIf="!currentUser.cards.length">
        <h3>Devi aggiungere prima una carta!</h3>
        <a routerLink="/cms/cards/add">Vai alla sezione per aggiungere una carta</a>
      </div>
    </div>
  `,
  styles: []
})
export class PaymentEditComponent implements OnInit {
  public currentUser: Observable<User>;
  public paymentForm: FormGroup = new FormGroup({});

  constructor(private readonly authService: AuthService, private readonly fb: FormBuilder) {
    this.currentUser = this.authService.me;
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.paymentForm = this.fb.group({
      quantity: ['', Validators.required],
      date: ['', Validators.required],
      card: ['', Validators.required],
      note: ['', Validators.required],
      isRecurrence: [false],
      recurrenceInDays: [''],
      tags: [''],
      importance: ['low']
    })
  }

}