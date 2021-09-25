import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';
import { User } from '@shared/models/user.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FileService } from '@shared/services/file.service';
import { switchMap } from 'rxjs/operators';
import { SpinnerService } from '@shared/services/spinner.service';
import { ModalService } from '@shared/services/modal.service';
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

          <div class="col-12 col-lg-9">
           <app-settings-form
             [settingsUserForm]="settingsUserForm"
             [location]="location" (resetPassword)="resetPassword()">
           </app-settings-form>
          </div>
        </div>

        <app-confirm-buttons (cancel)="cancelForm()" (save)="saveUser()" [disable]="settingsUserForm.invalid"></app-confirm-buttons>
      </div>
    </div>
  `,
  styles: [
    // language=scss
    `
      #container {
        width: calc(100vw - 80px);
        min-height: 100vh;

        @media (max-width: 768px) {
          width: 100vw;
          margin-bottom: 50px;
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

  constructor(
    private readonly authService: AuthService,
    private readonly fb: FormBuilder,
    private readonly fileService: FileService,
    private readonly spinnerService: SpinnerService,
    private readonly modalService: ModalService,
    private readonly snackBarService: SnackbarService
  ) {
  }

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

  public get location(): FormGroup {
    return this.settingsUserForm.get('location') as FormGroup;
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
    this.spinnerService.showSpinner$.next(true);
    this.subscriptions.push(
      this.authService.update(this.currentUser.id as string, this.settingsUserForm.value).subscribe(
        () =>
          setTimeout(() => this.spinnerService.showSpinner$.next(false), 300),
        () =>
          setTimeout(() => this.spinnerService.showSpinner$.next(false), 300)
      )
    );
  }

  public cancelForm(): void {
    this.modalService.cancelForm(this.settingsUserForm.dirty, '/dashboard');
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
    if (user) {
      this.settingsUserForm = this.fb.group({
        name: [{ value: user.name, disabled: !this.edit }],
        surname: [{ value: user.surname, disabled: !this.edit }],
        username: [{ value: user.username, disabled: !this.edit }],
        publicProfile: [{ value: user.publicProfile, disabled: !this.edit }],
        job: [{ value: user.job, disabled: !this.edit }],
        salary: [{ value: user.salary, disabled: !this.edit }],
        gender: [{ value: user.gender, disabled: !this.edit }],
        age: [{ value: user.age, disabled: !this.edit }],
        phoneNumber: [{ value: user.phoneNumber, disabled: !this.edit }],
        website: [{ value: user.website, disabled: !this.edit }],
        location: this.fb.group({
          city: [{ value: user.location.city, disabled: !this.edit }],
          address: [{ value: user.location.address, disabled: !this.edit }],
          cap: [{ value: user.location.cap, disabled: !this.edit }],
        }),
        biography: [{ value: user.biography, disabled: !this.edit }],
      });
    }
  }
}
