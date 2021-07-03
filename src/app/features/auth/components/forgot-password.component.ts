import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  template: `
    <div id="container">
      <h2>Password Dimenticata?</h2>
      <h3>Inserisci la tua email</h3>
      <div class="mb-3 row align-items-center">
        <label for="email" class="col-12 col-sm-3 col-form-label">Email</label>
        <div class="col-12 col-sm-9">
          <input
            type="email"
            class="form-control"
            id="email"
            [formControl]="recoverEmail"
          />
        </div>
      </div>

      <a
        routerLink="/login"
        class="text-primary text-decoration-underline d-block mb-3"
        >Torna al login</a
      >
      <div class="w-100 d-flex justify-content-center mt-5">
        <app-loading-button
          [disabled]="recoverEmail.invalid"
          [classes]="['btn', 'btn-primary', 'w-100', 'px-5', 'py-2']"
          text="Inva mail"
          (clicked)="forgotPassword()"
          [loading]="loading"
        >
        </app-loading-button>
      </div>
    </div>
  `,
  styles: [],
})
export class ForgotPasswordComponent {
  public recoverEmail = new FormControl('', [
    Validators.email,
    Validators.required,
  ]);
  public loading = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  public forgotPassword(): void {
    this.loading = true;
    this.authService.forgotPassword(this.recoverEmail.value).subscribe(
      () => this.router.navigateByUrl('/login'),
      () => (this.loading = false)
    );
  }
}
