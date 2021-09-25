import { Component } from '@angular/core';
import { AuthService } from "@shared/services/auth.service";
import { User } from "@shared/models/user.model";
import { Observable } from "rxjs";

@Component({
  selector: 'app-tools-container',
  template: `
    <div id="container" class="d-flex justify-content-center p-3 p-md-4">
      <div class="background-white w-100 p-3">
        <app-tools-earn-for-minutes [currentUser]="currentUser$ | async"></app-tools-earn-for-minutes>
      </div>
    </div>
  `,
  styles: [
    //language=scss
    `
      #container {
        width: calc(100vw - 80px);
        min-height: 100vh;

        @media (max-width: 768px) {
          width: 100vw;
          margin-bottom: 50px;
        }
      }
  `]
})
export class ToolsContainerComponent {
  public currentUser$: Observable<User> = this.authService.me;

  constructor(private readonly authService: AuthService) { }
}
