import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Color, WalletImg } from "@shared/models/enums";

@Component({
  selector: 'app-edit-card-media',
  template: `
    <div class="row">
      <h2>Media</h2>
      <div class="col-4">
        <label class="text-center cursor-pointer">
          <img [src]="backgroundUrl" alt="card background" class="img-fluid"/>
          <h2>Inserisci immagine di sfondo</h2>
          <input
            type="file"
            class="form-control-file d-none"
            (change)="uploadImage.emit($event)"
          />
        </label>
      </div>

      <div
        class="col-4 position-relative d-flex flex-column align-items-center"
      >
        <h2>Scegli un colore</h2>
        <div
          class="color cursor-pointer"
          [ngStyle]="{ backgroundColor: selectedColor }"
          (click)="showColorSelection = !showColorSelection"
        ></div>
        <div class="color-selection p-2" *ngIf="showColorSelection">
          <div class="row d-flex justify-content-center">
            <div
              class="col-4 color m-2 cursor-pointer"
              *ngFor="let color of colors"
              [ngStyle]="{ backgroundColor: color }"
              (click)="changeColor(color)"
            ></div>
          </div>
        </div>
      </div>

      <div
        class="col-4 position-relative d-flex flex-column align-items-center"
      >
        <h2>Scegli un'icona</h2>
        <img [src]="selectedPicture" alt="selected icon" class="icon cursor-pointer"
             (click)="showIconSelection = !showIconSelection"/>
        <div class="color-selection p-2" *ngIf="showIconSelection">
          <div class="row d-flex justify-content-center">
            <div class="col-4 m-2 cursor-pointer text-center" *ngFor="let icon of icons">
              <img [src]="icon" alt="icon" class="icon" (click)="changePicture(icon)">
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="overlay" (click)="closeMenu()" *ngIf="showColorSelection || showIconSelection"></div>
  `,
  styles: [
    //language=scss
    `
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

      .overlay {
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 5;
      }
    `
  ]
})
export class EditCardMediaComponent {
  @Input() selectedColor = Color.WHITE;
  @Input() selectedPicture = WalletImg.COLORED;
  @Input() backgroundUrl = '';

  @Output() uploadImage = new EventEmitter<Event>();
  @Output() handleSelectedColor = new EventEmitter<Color>()
  @Output() handleSelectedPicture = new EventEmitter<WalletImg>()

  public ColorEnum = Color;
  public colors = Object.values(Color);
  public showColorSelection = false;

  public IconEnum = WalletImg;
  public icons = Object.values(WalletImg);
  public showIconSelection = false;

  @HostListener('document:keydown.escape', ['$event'])
  closeMenu() {
    this.showIconSelection = false;
    this.showColorSelection = false;
  }

  public changeColor(color: Color): void {
    this.selectedColor = color;
    this.closeMenu();
    this.handleSelectedColor.emit(color);
  }

  public changePicture(picture: WalletImg): void {
    this.selectedPicture = picture;
    this.closeMenu();
    this.handleSelectedPicture.emit(picture);
  }

}
