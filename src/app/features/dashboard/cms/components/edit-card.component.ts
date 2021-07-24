import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Color, WalletImg } from '@shared/models/enums';
import { FileService } from '@shared/services/file.service';
import { SpinnerService } from '@shared/services/spinner.service';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-card',
  template: `
    <div id="container" class="d-flex justify-content-center p-3 p-md-4">
      <div class="background-white w-100 p-3">
        <h1>Aggiungi Carta</h1>
        <form class="d-flex flex-column justify-content-between">
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

          <div class="row">
            <h2>Media</h2>
            <div class="col-4">
              <label class="text-center cursor-pointer">
                <img [src]="" alt="card background"/>
                <h2>Inserisci immagine di sfondo</h2>
                <input
                  type="file"
                  class="form-control-file d-none"
                  (change)="uploadImage($event)"
                />
              </label>
            </div>

            <div
              class="col-4 position-relative d-flex flex-column align-items-center"
            >
              <h2>Scegli un colore</h2>
              <div
                class="color cursor-pointer"
                [ngStyle]="{ backgroundColor: ColorEnum.WHITE }"
                (click)="showColorSelection = !showColorSelection"
              ></div>
              <div class="color-selection p-2" *ngIf="showColorSelection">
                <div class="row d-flex justify-content-center">
                  <div
                    class="col-4 color m-2 cursor-pointer"
                    *ngFor="let color of colors"
                    [ngStyle]="{ backgroundColor: color }"
                  ></div>
                </div>
              </div>
            </div>

            <div
              class="col-4 position-relative d-flex flex-column align-items-center"
            >
              <h2>Scegli un'icona</h2>
              <img [src]="icons[0]" alt="selected icon" class="icon cursor-pointer" (click)="showIconSelection = !showIconSelection"/>
              <div class="color-selection p-2" *ngIf="showIconSelection">
                <div class="row d-flex justify-content-center">
                  <div class="col-4 m-2 cursor-pointer text-center" *ngFor="let icon of icons">
                    <img [src]="icon" alt="icon" class="icon">
                  </div>
                </div>
              </div>
            </div>
          </div>

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
            <button class="btn btn-light py-2 px-4">
              Annulla
            </button>
            <button class="btn btn-dark py-2 px-4">
              Salva
            </button>
          </div>
        </form>
      </div>
    </div>

    <div class="overlay" (click)="closeMenu()" *ngIf="showColorSelection || showIconSelection"></div>
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

        .color {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          border: 1px solid #000;

          &:hover {
            transform: scale(1.2);
          }
        }

        .color-selection {
          z-index: 10;
          position: absolute;
          background: #fff;
          box-shadow: 5px 5px 14px -4px #000000;
          width: 300px;
          top: 85px;
          left: calc(50% - 150px);
        }

        .icon {
          width: 2rem;
          height: 2rem;
        }
      }

      .overlay {
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 5;
      }
    `,
  ],
})
export class EditCardComponent implements OnInit {
  public ColorEnum = Color;
  public IconEnum = WalletImg;

  public colors = Object.values(Color);
  public icons = Object.values(WalletImg);

  public showColorSelection = false;
  public showIconSelection = false;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly spinnerService: SpinnerService,
    private readonly fileService: FileService
  ) {
    this.activatedRoute.params.subscribe((params) =>
      params.id ? console.log(params.id) : console.log('nulla')
    );
  }

  ngOnInit(): void {}

  @HostListener('document:keydown.escape', ['$event'])
  closeMenu() {
    this.showIconSelection = false;
    this.showColorSelection = false;
  }

  public uploadImage(event: Event): void {
    this.spinnerService.showSpinner$.next(true);
    // @ts-ignore
    const file = event.target.files[0];
    this.fileService
      .uploadImage('path' as string, file)
      .pipe(
        switchMap((pictureUrl: string) =>
          // aggiornare la carta
          of(null)
        )
      )
      .subscribe(
        () => this.spinnerService.showSpinner$.next(false),
        () => this.spinnerService.showSpinner$.next(false)
      );
  }
}
