import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  template: `
      <div id="container">
          <form [formGroup]="formLogin">
              <div class="mb-3 row align-items-center">
                  <label for="email" class="col-12 col-sm-2 col-form-label">Email</label>
                  <div class="col-12 col-sm-10">
                      <input type="email" class="form-control" id="email" formControlName="email">
                  </div>
              </div>
              <div class="mb-3 row align-items-center">
                  <label for="password" class="col-12 col-sm-2 col-form-label pb-sm-4">Password</label>
                  <div class="col-12 col-sm-10">
                      <input type="password" class="form-control" id="password" formControlName="password">
                      <a routerLink="/forgot-password"><small class="form-text text-muted">Password dimenticata?</small></a>
                  </div>
              </div>
          </form>

          <p>Nuovo utente? Registrati <a routerLink="/signup">qui</a></p>

          <div class="w-100 d-flex justify-content-center">
              <button class="btn btn-primary w-75" (click)="login()" [disabled]="formLogin.invalid">Login</button>
          </div>
      </div>
  `,
  styles: [
    //language=scss
    `
      #container {
        form {
          a {
            text-decoration-color: #6c757d;
          }
        }
      }
    `]
})
export class LoginComponent {
  public formLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  public login(): void {
  }
}
