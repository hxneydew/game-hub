import { Component } from '@angular/core';
import { ItemPreviewComponent } from '../item-preview/item-preview.component';

@Component({
  selector: 'app-selection-page',
  standalone: true,
  imports: [ItemPreviewComponent],
  templateUrl: './selection-page.component.html',
  styleUrl: './selection-page.component.scss',
})
export class SelectionPageComponent {}
