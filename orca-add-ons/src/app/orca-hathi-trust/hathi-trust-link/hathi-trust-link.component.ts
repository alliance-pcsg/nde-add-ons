import { ChangeDetectionStrategy } from '@angular/core';
import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'orca-hathi-trust-link',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './hathi-trust-link.component.html',
  styleUrl: './hathi-trust-link.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HathiTrustLinkComponent {
  url = input<string>();
}
