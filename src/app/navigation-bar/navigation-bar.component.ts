import { Component } from '@angular/core';
import { ButtonComponent, ButtonVariant } from '../button/button.component';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss',
})
export class NavigationBarComponent {
  readonly ButtonVariant = ButtonVariant;
}
