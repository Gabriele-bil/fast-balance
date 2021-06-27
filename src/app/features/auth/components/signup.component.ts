import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../shared/services/auth.service";

@Component({
  selector: 'app-signin',
  template: `
      <div id="container">
          <form [formGroup]="formSignup">
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
              <button class="btn btn-primary w-75" (click)="signup()"
                      [disabled]="formSignup.invalid || !passwordMatcher()">Registrati
              </button>
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

  constructor(private readonly authService: AuthService) {
  }

  public formSignup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    repeatPassword: new FormControl(''),
  });

  public passwordMatcher(): boolean {
    return this.formSignup.value.password === this.formSignup.value.repeatPassword;
  }

  public signup(): void {
    this.authService.signup(this.formSignup.value.email, this.formSignup.value.password);
  }
}
