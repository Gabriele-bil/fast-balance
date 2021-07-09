import { Component, OnInit } from '@angular/core';
import { UserService } from "@shared/services/user.service";
import { User } from "@shared/models/user.model";

@Component({
  selector: 'app-dashboard-container',
  template: `
    <div id="container">
      <app-dashboard-top-bar></app-dashboard-top-bar>
      <div class="d-flex">
        <app-dashboard-sidebar></app-dashboard-sidebar>
      </div>
    </div>
  `,
  styles: [
    //language=scss
    `
      #container {
        width: 100vw;
        min-height: 100vh;
        background-color: #111112;
      }
    `]
})
export class DashboardContainerComponent implements OnInit {


  constructor(private readonly userService: UserService) {
  }

  ngOnInit(): void {
    const newUser = {
      age: 40,
      username: 'furu',
      accounts: [],
      name: 'gabriele',
      location: {
        city: 'Palermo',
        cap: '90100',
        address: 'Via roma 100'
      },
      pictureUrl: '',
      publicProfile: true,
      surname: 'bilello',
      job: '',
      status: 'active'
    } as unknown as User;

    this.userService.update('AERY1pFkAWXQzYz2vpCO', newUser).subscribe((x) => console.log(x))
  }


}
