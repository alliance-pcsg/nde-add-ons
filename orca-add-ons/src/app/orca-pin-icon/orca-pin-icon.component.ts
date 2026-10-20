import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'orca-pin-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orca-pin-icon.component.html',
  styleUrl: './orca-pin-icon.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class OrcaPinIconComponent {
  // Build the favorites link from the current view so it works for any institution.
  get favoritesHref(): string {
    const current = new URLSearchParams(window.location.search);
    const params = new URLSearchParams();
    const vid = current.get('vid');
    const lang = current.get('lang');
    if (vid) params.set('vid', vid);
    if (lang) params.set('lang', lang);
    const query = params.toString();
    return query ? `account/favorites?${query}` : 'account/favorites';
  }
}
