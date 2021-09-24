import { Component, Input } from '@angular/core';
import { IUser, User } from "@shared/models/user.model";

@Component({
  selector: 'app-tools-earn-for-minutes',
  template: `
    <h2>Guadagno per minuto</h2>
    <div *ngIf="currentUser" class="d-flex">
      <div>
        <label>Stipendio mensile</label>
        <input type="text" class="form-control" readonly [value]="currentUser.salary">
      </div>

      <div class="mx-4">
        <label>Stipendio al giorno</label>
        <input type="text" class="form-control" readonly [value]="salaryForDay">
      </div>

      <div>
        <label>Stipendio al minuto</label>
        <input type="text" class="form-control" readonly [value]="salaryForMinute">
      </div>
    </div>
  `,
  styles: [
  ]
})
export class ToolsEarnForMinutesComponent {
  @Input() currentUser: User | null = User.Build({} as IUser);

  get salaryForDay(): string {
    return this.currentUser
      ? (this.currentUser.salary / 30).toFixed(3)
      : '0'
  }

  get salaryForMinute(): string {
    return this.currentUser
      ? (((this.currentUser.salary / 30) / 24) / 60).toFixed(3)
      : '0'
  }
}
