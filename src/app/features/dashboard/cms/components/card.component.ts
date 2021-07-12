import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-card',
  template: `
    <p>
      card works!
    </p>
  `,
  styles: []
})
export class CardComponent implements OnInit {

  constructor(private readonly activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => params.id ? console.log(params.id) : console.log('nulla'))
  }

  ngOnInit(): void {
  }

}
