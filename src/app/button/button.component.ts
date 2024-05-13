import { Component, EventEmitter, Input, Output } from '@angular/core';

export enum ButtonVariant {
  DEFAULT = 'default',
  DECORATIVE = 'decorative',
  HEADER = 'header',
}

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() buttonText: string = 'Click me';
  @Input() variant: ButtonVariant = ButtonVariant.DEFAULT;
  @Output() clicked = new EventEmitter<void>();
  readonly ButtonVariant = ButtonVariant;

  onClick(): void {
    this.clicked.emit();
  }
}
