import { Component } from '@angular/core';
import { HomeContainerComponent } from './home-container/home-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'game-hub';
}
