import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from "@shared/services/auth.service";
import { User } from "@shared/models/user.model";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "@shared/services/user.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-settings-container',
  template: `
    <div id="container" class="d-flex justify-content-center p-5">
      <div class="background-white w-100 p-4">
        <h1>Impostazioni Account</h1>
        <div class="d-flex flex-row-reverse w-100">
          <button class="btn btn-primary" (click)="toggleForm()">
            {{ edit ? 'Viusalizza' : 'Modifica' }}
          </button>
        </div>
        <div class="row w-100 justify-content-between mt-5">
          <form class="col-8" [formGroup]="settingsUserForm">
            <div class="row">
              <div class="col">
                <input type="text" class="form-control" placeholder="Nome" formControlName="name"/>
              </div>
              <div class="col">
                <input type="text" class="form-control" placeholder="Cognome" formControlName="surname"/>
              </div>
            </div>

            <div class="row my-5">
              <div class="col">
                <input type="text" class="form-control" placeholder="Username"
                       formControlName="username"/>
              </div>
              <div class="col">
                <button class="btn btn-secondary h-100">Reimposta password</button>
              </div>
            </div>

            <div class="row my-5">
              <div class="col">
                <input type="text" class="form-control" placeholder="Lavoro" formControlName="job"/>
              </div>
              <div class="col-3">
                <select class="form-control" formControlName="gender">
                  <option value="" disabled selected>Genere</option>
                  <option value="male">Uomo</option>
                  <option value="female">Donna</option>
                  <option value="other">Altro</option>
                </select>
              </div>
            </div>

            <div class="row my-5">
              <div class="col-3">
                <input type="number" class="form-control" placeholder="Età" formControlName="age"/>
              </div>
              <div class="col">
                <input type="text" class="form-control" placeholder="Telefono" formControlName="phoneNumber"/>
              </div>
            </div>

            <div class="row my-5">
              <div class="col">
                <input type="text" class="form-control" placeholder="Città" formControlName="city"/>
              </div>
              <div class="col">
                <input type="text" class="form-control" placeholder="Via" formControlName="address"/>
              </div>
              <div class="col">
                <input type="text" class="form-control" placeholder="CAP" formControlName="cap"/>
              </div>
            </div>

            <div class="row my-5">
              <div class="col">
                <textarea class="form-control" placeholder="Biografia" formControlName="biography"></textarea>
              </div>
            </div>
          </form>

          <div class="col-4">
            <app-settings-summary [edit]="edit"></app-settings-summary>
          </div>
        </div>

        <div class="d-flex justify-content-between align-items-center">
          <button class="btn btn-light py-2 px-4" (click)="cancelForm()">Annulla</button>
          <button class="btn btn-dark py-2 px-4" (click)="saveUser()">Salva</button>
        </div>
      </div>
    </div>
  `,
  styles: [
    // language=scss
    `
      #container {
        width: calc(100vw - 80px);
        min-height: 100vh;

        .background-white {
          background-color: #fafafa;

          textarea {
            min-height: 80px;
          }
        }
      }
    `,
  ],
})
export class SettingsContainerComponent implements OnInit, OnDestroy {
  public edit = false;
  public settingsUserForm!: FormGroup;
  private currentUser: User = {} as User;
  private subscriptions: Subscription[] = [];

  constructor(
    private readonly authService: AuthService,
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.subscriptions.push(this.authService.me.subscribe(user => {
      this.currentUser = user;
      this.setForm(user);
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public toggleForm(): void {
    this.edit = !this.edit;
    this.edit ? this.settingsUserForm.enable() : this.settingsUserForm.disable();
  }

  public saveUser(): void {
    const formValue = this.settingsUserForm.value
    const body = {
      name: formValue.name,
      surname: formValue.surname,
      username: formValue.username,
      job: formValue.job,
      gender: formValue.gender,
      age: formValue.age,
      phoneNumber: formValue.phoneNumber,
      location: {
        city: formValue.city,
        address: formValue.address,
        cap: formValue.cap,
      },
      biography: formValue.biography
    } as User;

    this.subscriptions.push(this.userService.update(this.currentUser.id as string, body).subscribe(x => console.log(x)));
  }

  public cancelForm(): void {
    this.settingsUserForm.dirty ? console.log('modale') : console.log('nulla');
  }

  private setForm(user: User) {
    this.settingsUserForm = this.fb.group({
      name: [{ value: user.name, disabled: !this.edit }],
      surname: [{ value: user.surname, disabled: !this.edit }],
      username: [{ value: user.username, disabled: !this.edit }],
      job: [{ value: user.job, disabled: !this.edit }],
      gender: [{ value: user.gender, disabled: !this.edit }],
      age: [{ value: user.age, disabled: !this.edit }],
      phoneNumber: [{ value: user.phoneNumber, disabled: !this.edit }],
      city: [{ value: user.location.city, disabled: !this.edit }],
      address: [{ value: user.location.address, disabled: !this.edit }],
      cap: [{ value: user.location.cap, disabled: !this.edit }],
      biography: [{ value: user.biography, disabled: !this.edit }],
    })
  }
}
