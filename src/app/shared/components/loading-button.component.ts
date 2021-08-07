import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-loading-button',
  template: `
      <button (click)="clicked.emit()" [ngClass]="classes" [disabled]="disabled || loading">
          <span *ngIf="!loading">{{ text }}</span>
          <span id="loading" *ngIf="loading">
              <span>&bull;</span><span>&bull;</span><span>&bull;</span>
          </span>
      </button>
  `,
  styles: []
})
export class LoadingButtonComponent {
  @Input() loading = false;
  @Input() text = '';
  @Input() classes: string[] = [];
  @Input() disabled = false;

  @Output() clicked = new EventEmitter<void>();
}
