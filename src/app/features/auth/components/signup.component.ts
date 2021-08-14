import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "@shared/services/auth.service";

@Component({
  selector: 'app-signin',
  template: `
    <div id="container">
      <form [formGroup]="formSignup">
        <div class="mb-3 row align-items-center">
          <label for="username" class="col-12 col-sm-3 col-form-label">Username</label>
          <div class="col-12 col-sm-9">
            <input type="text" class="form-control" id="username" formControlName="username">
          </div>
        </div>

        <div class="mb-3 row align-items-center">
          <label for="email" class="col-12 col-sm-3 col-form-label">Email</label>
          <div class="col-12 col-sm-9">
            <input type="email" class="form-control" id="email" formControlName="email">
          </div>
        </div>
        <div class="mb-3 row align-items-center">
          <label for="password" class="col-12 col-sm-3 col-form-label pb-sm-4">Password</label>
          <div class="col-12 col-sm-9">
            <input type="password" class="form-control" id="password" formControlName="password">
            <small>La password deve essere lunga almeno 6 caratteri</small>
          </div>
        </div>

        <div class="mb-3 row align-items-center">
          <label for="repeat-password" class="col-12 col-sm-3 col-form-label pb-sm-4">Ripeti password</label>
          <div class="col-12 col-sm-9">
            <input type="password" class="form-control" id="repeat-password" formControlName="repeatPassword">
          </div>
        </div>
      </form>

      <a routerLink="/login" class="text-primary text-decoration-underline">Già registrato? Effettua il login
        qui</a>

      <div class="w-100 d-flex justify-content-center mt-5">
        <app-loading-button [disabled]="formSignup.invalid || !passwordMatcher()"
                            [classes]="['btn', 'btn-primary', 'w-100', 'px-5', 'py-2']" text="Registrati"
                            (clicked)="signup()" [loading]="loading">
        </app-loading-button>
      </div>
    </div>
  `,
  styles: [`
    a {
      cursor: pointer;
    }
  `]
})
export class SignupComponent {
  public formSignup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    repeatPassword: new FormControl(''),
  });

  public loading = false;

  constructor(private readonly authService: AuthService) {
  }

  public passwordMatcher(): boolean {
    return this.formSignup.value.password === this.formSignup.value.repeatPassword;
  }

  public signup(): void {
    this.loading = true;
    this.authService.signup(this.formSignup.value.username, this.formSignup.value.email, this.formSignup.value.password).subscribe(
      () => this.loading = false,
      () => this.loading = false
    );
  }
}
