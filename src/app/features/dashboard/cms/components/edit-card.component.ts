import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileService } from '@shared/services/file.service';
import { SpinnerService } from '@shared/services/spinner.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Color, WalletImg } from "@shared/models/enums";
import { CardService } from "@shared/services/card.service";
import { Card } from "@shared/models/card.model";
import { AuthService } from "@shared/services/auth.service";
import { User } from "@shared/models/user.model";
import { ModalService } from "@shared/services/modal.service";

@Component({
  selector: 'app-edit-card',
  template: `
    <div id="container" class="d-flex justify-content-center p-3 p-md-4">
      <div class="background-white w-100 p-3">
        <h1>{{ cardId ? 'Modifica Carta' : 'Aggiungi Carta'}}</h1>
        <form class="d-flex flex-column justify-content-between" [formGroup]="cardForm">
          <div class="row">
            <h2>Informazioni di base</h2>
            <div class="col-12 col-sm-8">
              <input
                type="text"
                class="form-control"
                placeholder="Nome"
                formControlName="name"
              />
            </div>

            <div class="row my-0 my-md-5">
              <div class="col">
              <textarea
                class="form-control"
                placeholder="Descrizione"
                formControlName="description"
              ></textarea>
              </div>
            </div>
          </div>

          <app-edit-card-media
            [selectedColor]="color"
            [selectedPicture]="iconUrl"
            [backgroundUrl]="backGroundUrl"
            (handleSelectedColor)="color = $event"
            (handleSelectedPicture)="iconUrl = $event"
            (uploadImage)="uploadImage($event)">
          </app-edit-card-media>

          <div class="row">
            <h2>Bilancio</h2>
            <div class="col-12 col-sm-4">
              <input
                type="number"
                min="0"
                class="form-control"
                placeholder="Bilancio iniziale"
                formControlName="balance"
              />
            </div>

            <div class="col-12 col-sm-4 d-flex align-items-center justify-content-center">
              <label class="d-flex align-items-center">
                <input
                  type="checkbox"
                  formControlName="limitBudget"
                  (click)="handleBudget()"
                />
                <h3 class="ms-3 mb-0">Limite mensile</h3>
              </label>
            </div>

            <div class="col-12 col-sm-4">
              <input
                type="number"
                min="0"
                class="form-control"
                placeholder="Limite mensile"
                formControlName="monthlyBudget"
              />
            </div>
          </div>

          <app-confirm-buttons [disable]="!cardForm.invalid" (save)="saveCard()" (cancel)="cancelForm()"></app-confirm-buttons>
        </form>
      </div>
    </div>
  `,
  styles: [
    //language=scss
    `
      #container {
        width: calc(100vw - 80px);
        min-height: 100vh;

        form {
          height: 90%;
        }
      }
    `,
  ],
})
export class EditCardComponent implements OnInit {
  public cardForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    balance: [0],
    limitBudget: [false],
    monthlyBudget: ['']
  });

  public backGroundUrl = '';
  public iconUrl: WalletImg = WalletImg.COLORED;
  public color: Color = Color.WHITE;
  public currentUser!: User;
  public cardId = '';

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly spinnerService: SpinnerService,
    private readonly fileService: FileService,
    private readonly cardService: CardService,
    private readonly authService: AuthService,
    private readonly modalService: ModalService
  ) {
  }

  ngOnInit(): void {
    this.cardId = this.activatedRoute.snapshot.params.id ? this.activatedRoute.snapshot.params.id : '';
    this.authService.me.subscribe(user => this.currentUser = user);
    this.getCard();
    this.handleBudget();
  }

  public handleBudget(): void {
    setTimeout(() => this.cardForm.get('limitBudget')?.value
      ? this.cardForm.get('monthlyBudget')?.enable()
      : this.cardForm.get('monthlyBudget')?.disable(), 0);
  }

  public uploadImage(event: Event): void {
    this.spinnerService.showSpinner$.next(true);
    // @ts-ignore
    const file = event.target.files[0];
    this.fileService
      .uploadImage(`${ this.currentUser.id }/cardsBackground`, file).subscribe(
      (backgroundUrl) => {
        this.backGroundUrl = backgroundUrl;
        this.spinnerService.showSpinner$.next(false)
      },
      () => this.spinnerService.showSpinner$.next(false)
    );
  }

  public saveCard(): void {
    if (this.cardForm.valid) {
      this.spinnerService.showSpinner$.next(true);
      const body = {
        name: this.cardForm.value.name,
        description: this.cardForm.value.description,
        backgroundUrl: this.backGroundUrl,
        iconUrl: this.iconUrl,
        color: this.color,
        balance: this.cardForm.value.balance,
        monthlyBudget: this.cardForm.value.monthlyBudget ? this.cardForm.value.monthlyBudget : '',
        limitBudget: this.cardForm.value.limitBudget,
      } as Card;

      this.cardForm.reset(this.cardForm.value);
      this.cardId ? this.updateCard(body) : this.addNewCard(body);
    }
  }

  public cancelForm(): void {
    this.modalService.cancelForm(this.cardForm.dirty, '/dashboard/cms/cards');
  }

  private getCard(): void {
    if (this.activatedRoute.snapshot.params.id) {
      setTimeout(() => this.spinnerService.showSpinner$.next(true), 0);
      this.cardService.getById(this.cardId).subscribe(
        card => {
          this.cardForm.patchValue({
            name: card?.name,
            description: card?.description,
            balance: card?.balance,
            limitBudget: card?.limitBudget,
            monthlyBudget: card?.monthlyBudget ? card?.monthlyBudget : ''
          });
          this.backGroundUrl = card?.backgroundUrl ? card.backgroundUrl : '';
          this.iconUrl = card?.iconUrl ? card.iconUrl : WalletImg.COLORED;
          this.color = card?.color ? card.color : Color.WHITE;
          this.spinnerService.showSpinner$.next(false);
          this.handleBudget();
        }
      )
    }
  }

  private updateCard(body: Card): void {
    console.log(body);
    this.spinnerService.showSpinner$.next(true);
    this.cardService.update(this.cardId, body).subscribe(
      card => {
        if (card) {
          const index = this.currentUser.cards.findIndex(c => c.id === this.cardId);
          const cards =  this.currentUser.cards;
          cards.splice(index, 1, card);
          // @ts-ignore
          this.authService.update(this.currentUser.id, { cards }).subscribe();
        }
        this.spinnerService.showSpinner$.next(false);
      },
      () => this.spinnerService.showSpinner$.next(false)
    )
  }

  private addNewCard(body: Card): void {
    this.cardService.create(body).subscribe(
      (card) => {
        if (card) {
          const cards = this.currentUser.cards.length ? [...this.currentUser.cards, { ...card }] : [{ ...card }];
          // @ts-ignore
          this.authService.update(this.currentUser.id, { cards }).subscribe();
        }
        this.spinnerService.showSpinner$.next(false)
      },
      () => this.spinnerService.showSpinner$.next(false),
    )
  }
}
