import { Component, Inject, Optional, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PinIconConfig {
  iconColor?: string;
  hoverBackgroundColor?: string;
  hoverIconColor?: string;
}

@Component({
  selector: 'orca-pin-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orca-pin-icon.component.html',
  styleUrl: './orca-pin-icon.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class OrcaPinIconComponent {
  colorVars: Record<string, string> = {};

  constructor(@Optional() @Inject('MODULE_PARAMETERS') moduleParameters: PinIconConfig | null) {
    // Blank or missing values fall back to the header's own colours (see the .scss).
    const config = moduleParameters ?? {};
    if (config.iconColor) this.colorVars['--orca-pin-icon-color'] = config.iconColor;
    if (config.hoverBackgroundColor) this.colorVars['--orca-pin-icon-hover-bg'] = config.hoverBackgroundColor;
    if (config.hoverIconColor) this.colorVars['--orca-pin-icon-hover-color'] = config.hoverIconColor;
  }

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
