import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'loading-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="loading-ring">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>`,
  styleUrl: './loading-spinner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingSpinnerComponent {}
