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
        <h1>Aggiungi Carta</h1>
        <form class="d-flex flex-column justify-content-between" [formGroup]="cardForm" (ngSubmit)="saveCards()">
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
            (handleSelectedPicture)="backGroundUrl = $event"
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

          <div class="d-flex justify-content-between align-items-center mt-3">
            <button type="button" class="btn btn-light py-2 px-4" (click)="cancelForm()">
              Annulla
            </button>
            <button type="submit" class="btn btn-dark py-2 px-4">
              Salva
            </button>
          </div>
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
  public cardForm!: FormGroup;
  public backGroundUrl = '';
  public iconUrl: WalletImg = WalletImg.COLORED;
  public color: Color = Color.WHITE;
  public currentUser!: User;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly spinnerService: SpinnerService,
    private readonly fileService: FileService,
    private readonly cardService: CardService,
    private readonly authService: AuthService,
    private readonly modalService: ModalService
  ) {
    this.activatedRoute.params.subscribe((params) =>
      params.id ? console.log(params.id) : console.log('nulla')
    );
  }

  public handleBudget(): void {
    this.cardForm.get('limitBudget')?.value
      ? this.cardForm.get('monthlyBudget')?.disable()
      : this.cardForm.get('monthlyBudget')?.enable();
  }

  ngOnInit(): void {
    this.authService.me.subscribe(user => this.currentUser = user);
    this.cardForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required,],
      balance: [0],
      limitBudget: [false],
      monthlyBudget: ['']
    })
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

  public saveCards(): void {
    if (this.cardForm.valid) {
      this.spinnerService.showSpinner$.next(true);
      const body = {
        name: this.cardForm.value.name,
        description: this.cardForm.value.description,
        backgroundUrl: this.backGroundUrl,
        iconUrl: this.iconUrl,
        color: this.color,
        balance: this.cardForm.value.balance,
        monthlyBudget: this.cardForm.value.monthlyBudget,
        limitBudget: this.cardForm.value.limitBudget,
      } as Card;

      this.cardService.create(body).subscribe(
        (card) => {
          if (card) {
            const cards = { ...this.currentUser.cards, card };
            // @ts-ignore
            this.authService.update(this.currentUser.id, { cards })
          }
          this.spinnerService.showSpinner$.next(false)
        },
        () => this.spinnerService.showSpinner$.next(false),
      )
    }
  }

  public cancelForm(): void {
    this.modalService.cancelForm(this.cardForm.dirty, '/dashboard/cms/cards');
  }
}
