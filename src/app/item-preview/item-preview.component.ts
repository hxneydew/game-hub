import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-preview.component.html',
  styleUrl: './item-preview.component.scss',
})
export class ItemPreviewComponent {
  @Input() first: boolean = false;
}
