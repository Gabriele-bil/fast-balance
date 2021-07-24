import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-edit-card',
  template: `
    <div id="container" class="d-flex justify-content-center p-3 p-md-4">
      <div class="background-white w-100 p-3">
        <h1>Aggiungi Carta</h1>
      </div>
    </div>
  `,
  styles: [
    //language=scss
    `
      #container {
        width: calc(100vw - 80px);
        min-height: 100vh;
      }
    `]
})
export class EditCardComponent implements OnInit {

  constructor(private readonly activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => params.id ? console.log(params.id) : console.log('nulla'))
  }

  ngOnInit(): void {
  }

}
