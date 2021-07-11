import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';
import { User } from '@shared/models/user.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FileService } from '@shared/services/file.service';
import { switchMap } from 'rxjs/operators';
import { SpinnerService } from '@shared/services/spinner.service';
import { ModalService } from '@shared/services/modal.service';
import { ModalData } from '@shared/models/modal.model';
import { SnackbarService } from '@shared/services/snackbar.service';

@Component({
  selector: 'app-settings-container',
  template: `
    <div id="container" class="d-flex justify-content-center p-3 p-md-4">
      <div class="background-white w-100 p-3">
        <h1>Impostazioni Account</h1>

        <div class="d-flex flex-row-reverse w-100">
          <button class="btn btn-primary" (click)="toggleForm()">
            {{ edit ? 'Viusalizza' : 'Modifica' }}
          </button>
        </div>

        <div class="row mt-3">
          <div class="col-12 col-lg-3 mb-3 mb-lg-0">
            <app-settings-summary
              [edit]="edit"
              [user]="currentUser"
              (uploadFile)="uploadImage($event)"
            ></app-settings-summary>
          </div>

          <form class="col-12 col-lg-9" [formGroup]="settingsUserForm">
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
                  (click)="resetPassword()"
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
              <div class="col-12 col-md-8 mb-3 mb-md-0">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Lavoro"
                  formControlName="job"
                />
              </div>
              <div class="col-12 col-md-4 mb-3 mb-md-0">
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

            <div class="row my-0 my-md-5">
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
        </div>

        <div class="d-flex justify-content-between align-items-center mt-3">
          <button class="btn btn-light py-2 px-4" (click)="cancelForm()">
            Annulla
          </button>
          <button class="btn btn-dark py-2 px-4" (click)="saveUser()">
            Salva
          </button>
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

          .form-check-label {
            font-size: 1rem;

            span {
              display: inline-block;
              margin-top: 3px;
            }
          }
        }
      }
    `,
  ],
})
export class SettingsContainerComponent implements OnInit, OnDestroy {
  public edit = false;
  public settingsUserForm!: FormGroup;
  public currentUser: User = {} as User;
  private subscriptions: Subscription[] = [];
  private modalText: ModalData = {
    title: 'Perderai tutte le modifiche effettuate',
    description: 'Sei sicuro di voler uscire?',
    cancelButton: 'No',
    confirmButton: 'Si',
  };

  constructor(
    private readonly authService: AuthService,
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly fileService: FileService,
    private readonly spinnerService: SpinnerService,
    private readonly modalService: ModalService,
    private readonly snackBarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.authService.me.subscribe((user) => {
        this.currentUser = user;
        this.setForm(user);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  public toggleForm(): void {
    this.edit = !this.edit;
    this.edit
      ? this.settingsUserForm.enable()
      : this.settingsUserForm.disable();
  }

  public resetPassword(): void {
    this.authService
      .forgotPassword(this.currentUser.email)
      .subscribe(() =>
        this.snackBarService.openSnackBar('Ti è stata mandata una mail')
      );
  }

  public saveUser(): void {
    const formValue = this.settingsUserForm.value;
    const body = {
      name: formValue.name,
      surname: formValue.surname,
      username: formValue.username,
      publicProfile: formValue.publicProfile,
      job: formValue.job,
      gender: formValue.gender,
      age: formValue.age,
      phoneNumber: formValue.phoneNumber,
      website: formValue.website,
      location: {
        city: formValue.city,
        address: formValue.address,
        cap: formValue.cap,
      },
      biography: formValue.biography,
    } as User;
    this.spinnerService.showSpinner$.next(true);
    this.subscriptions.push(
      this.authService.update(this.currentUser.id as string, body).subscribe(
        () =>
          setTimeout(() => this.spinnerService.showSpinner$.next(false), 300),
        () =>
          setTimeout(() => this.spinnerService.showSpinner$.next(false), 300)
      )
    );
  }

  public cancelForm(): void {
    if (this.settingsUserForm.dirty) {
      const modalRef = this.modalService.openModal(this.modalText);
      modalRef.componentInstance.confirm.subscribe((result: boolean) => {
        if (result) {
          modalRef.close();
        }
        this.router.navigateByUrl('/dashboard');
      });
    } else {
      this.router.navigateByUrl('/dashboard');
    }
  }

  public uploadImage(event: Event): void {
    this.spinnerService.showSpinner$.next(true);
    // @ts-ignore
    const file = event.target.files[0];
    this.fileService
      .uploadImage(this.currentUser.id as string, file)
      .pipe(
        switchMap((pictureUrl) =>
          this.authService.update(
            this.currentUser.id as string,
            { pictureUrl } as User
          )
        )
      )
      .subscribe(
        () => this.spinnerService.showSpinner$.next(false),
        () => this.spinnerService.showSpinner$.next(false)
      );
  }

  private setForm(user: User): void {
    this.settingsUserForm = this.fb.group({
      name: [{ value: user.name, disabled: !this.edit }],
      surname: [{ value: user.surname, disabled: !this.edit }],
      username: [{ value: user.username, disabled: !this.edit }],
      publicProfile: [{ value: user.publicProfile, disabled: !this.edit }],
      job: [{ value: user.job, disabled: !this.edit }],
      gender: [{ value: user.gender, disabled: !this.edit }],
      age: [{ value: user.age, disabled: !this.edit }],
      phoneNumber: [{ value: user.phoneNumber, disabled: !this.edit }],
      website: [{ value: user.website, disabled: !this.edit }],
      city: [{ value: user.location.city, disabled: !this.edit }],
      address: [{ value: user.location.address, disabled: !this.edit }],
      cap: [{ value: user.location.cap, disabled: !this.edit }],
      biography: [{ value: user.biography, disabled: !this.edit }],
    });
  }
}
