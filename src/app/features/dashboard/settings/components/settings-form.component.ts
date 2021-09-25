import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-settings-form',
  template: `
    <form [formGroup]="settingsUserForm">
      <div class="row">
        <div class="col-12 col-sm-6 mb-3 mb-sm-0">
          <input
            type="text"
            class="form-control"
            placeholder="Nome"
            formControlName="name"
          />
        </div>
        <div class="col-12 col-sm-6 mb-3 mb-md-0">
          <input
            type="text"
            class="form-control"
            placeholder="Cognome"
            formControlName="surname"
          />
        </div>
      </div>

      <div class="row my-0 my-md-5">
        <div class="col-12 col-lg-6 mb-3 mb-lg-0">
          <input
            type="text"
            class="form-control"
            placeholder="Username"
            formControlName="username"
          />
        </div>
        <div class="col-12 col-sm-6 col-lg-3 mb-3 mb-md-0">
          <button
            class="btn btn-secondary h-100"
            (click)="resetPassword.emit()"
          >
            Reimposta password
          </button>
        </div>

        <div class="col-12 col-sm-6 col-lg-3 mb-3 mb-md-0 d-flex align-items-center">
          <div class="form-group form-check">
            <label class="form-check-label">
              <input
                type="checkbox"
                class="form-check-input"
                formControlName="publicProfile"
              />
              <span class="">Profilo visibile</span>
            </label>
          </div>
        </div>
      </div>

      <div class="row my-0 my-md-5">
        <div class="col-12 col-md-5 mb-3 mb-md-0">
          <input
            type="text"
            class="form-control"
            placeholder="Lavoro"
            formControlName="job"
          />
        </div>
        <div class="col-12 col-md-4 mb-3 mb-md-0">
          <input
            type="number"
            class="form-control"
            placeholder="Stipendio"
            formControlName="salary"
          />
        </div>

        <div class="col-12 col-md-3 mb-3 mb-md-0">
          <select class="form-control" formControlName="gender">
            <option value="" disabled selected>Genere</option>
            <option value="male">Uomo</option>
            <option value="female">Donna</option>
            <option value="other">Altro</option>
          </select>
        </div>
      </div>

      <div class="row my-0 my-md-5">
        <div class="col-4">
          <input
            type="number"
            class="form-control"
            placeholder="Età"
            formControlName="age"
          />
        </div>
        <div class="col-8 col-md-4 mb-3 mb-md-0">
          <input
            type="text"
            class="form-control"
            placeholder="Telefono"
            formControlName="phoneNumber"
          />
        </div>

        <div class="col-12 col-md-4 mb-3 mb-md-0">
          <input
            type="text"
            class="form-control"
            placeholder="Sito Web"
            formControlName="website"
          />
        </div>
      </div>

      <div class="row my-0 my-md-5" [formGroup]="location">
        <div class="col-12 col-md-4 mb-3 mb-md-0">
          <input
            type="text"
            class="form-control"
            placeholder="Città"
            formControlName="city"
          />
        </div>
        <div class="col-12 col-sm-8 col-md-6 mb-3 mb-sm-0">
          <input
            type="text"
            class="form-control"
            placeholder="Via"
            formControlName="address"
          />
        </div>
        <div class="col-12 col-sm-4 col-md-2 mb-3 mb-md-0">
          <input
            type="text"
            class="form-control"
            placeholder="CAP"
            formControlName="cap"
          />
        </div>
      </div>

      <div class="row my-0 my-md-5">
        <div class="col">
                <textarea
                  class="form-control"
                  placeholder="Biografia"
                  formControlName="biography"
                ></textarea>
        </div>
      </div>
    </form>
  `,
  styles: [
    //language=scss
    `
    textarea {
      min-height: 80px;
    }

    .form-check-label {
      font-size: 1rem;

    span {
      display: inline-block;
      margin-top: 3px;
    }
    }
  `]
})
export class SettingsFormComponent {
  @Input() settingsUserForm!: FormGroup;
  @Input() location!: FormGroup;

  @Output() resetPassword = new EventEmitter<void>();
}
