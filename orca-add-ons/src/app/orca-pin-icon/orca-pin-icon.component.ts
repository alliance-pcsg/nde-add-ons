import { Component, Inject, Optional, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PinIconConfig {
  iconColor?: string;
  hoverBackgroundColor?: string;
  hoverIconColor?: string;
  hideSearches?: number | string;
  hideFavorites?: number | string;
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
  showSearchHistory: boolean;
  showFavorites: boolean;

  constructor(@Optional() @Inject('MODULE_PARAMETERS') moduleParameters: PinIconConfig | null) {
    // Blank or missing values fall back to the header's own colours (see the .scss).
    // Set on the root so the NDE user area icons outside this component can use them too.
    const config = moduleParameters ?? {};
    const root = document.documentElement.style;
    if (config.iconColor) root.setProperty('--orca-pin-icon-color', config.iconColor);
    if (config.hoverBackgroundColor) root.setProperty('--orca-pin-icon-hover-bg', config.hoverBackgroundColor);
    if (config.hoverIconColor) root.setProperty('--orca-pin-icon-hover-color', config.hoverIconColor);
    // Both icons show unless hidden with a value of 1 (number or string).
    this.showSearchHistory = Number(config.hideSearches) !== 1;
    this.showFavorites = Number(config.hideFavorites) !== 1;
  }

  // Build account links from the current view so they work for any institution.
  get searchHistoryHref(): string {
    return this.accountHref('account/searchHistory');
  }

  get favoritesHref(): string {
    return this.accountHref('account/favorites');
  }

  private accountHref(path: string): string {
    const current = new URLSearchParams(window.location.search);
    const params = new URLSearchParams();
    const vid = current.get('vid');
    const lang = current.get('lang');
    if (vid) params.set('vid', vid);
    if (lang) params.set('lang', lang);
    const query = params.toString();
    return query ? `${path}?${query}` : path;
  }
}
