import { Component, OnInit } from '@angular/core';
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
        <form>
          <div class="row">
            <div class="col-12 col-sm-8">
              <input
                type="text"
                class="form-control"
                placeholder="Nome"
                formControlName="name"
              />
            </div>
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

          <div class="row">
            <div class="col-4">
              <label class="text-center cursor-pointer">
                <img [src]="" alt="card background" />
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
                (click)="showColorSelction = !showColorSelction"
              ></div>
              <div class="color-selection p-2" *ngIf="showColorSelction">
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
              <img [src]="icons[0]" alt="selected icon" class="icon" />
            </div>
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
          position: absolute;
          background: #fff;
          box-shadow: 5px 5px 14px -4px #000000;
          width: 300px;
          top: 85px;
          left: 12px;
        }

        .icon {
          width: 2rem;
          height: 2rem;
        }
      }
    `,
  ],
})
export class EditCardComponent implements OnInit {
  public ColorEnum = Color;
  public IconEnum = WalletImg;

  public colors = Object.values(Color);
  public icons = Object.values(WalletImg);

  public showColorSelction = false;

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
