import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-container',
  template: `
    <p>
      auth-container works!
    </p>
    
    <router-outlet></router-outlet>
  `,
  styles: [
  ]
})
export class AuthContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
