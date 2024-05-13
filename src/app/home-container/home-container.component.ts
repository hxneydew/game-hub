import { Component } from '@angular/core';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { SelectionPageComponent } from '../selection-page/selection-page.component';
import { RouterOutlet } from '@angular/router';
import { TicTacToeComponent } from '../tic-tac-toe/tic-tac-toe.component';

@Component({
  selector: 'app-home-container',
  standalone: true,
  imports: [
    NavigationBarComponent,
    RouterOutlet,
    SelectionPageComponent,
    TicTacToeComponent,
  ],
  templateUrl: './home-container.component.html',
  styleUrl: './home-container.component.scss',
})
export class HomeContainerComponent {}
