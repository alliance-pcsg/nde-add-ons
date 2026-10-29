import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, Optional, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PinIconConfig {
  iconColor?: string;
  hoverBackgroundColor?: string;
  hoverIconColor?: string;
  hideSearches?: number | string;
  hideFavorites?: number | string;
}

// The site's own user area (login) button, which the pin icons are sized to match.
const USER_AREA_BUTTON = 'nde-user-area button.mat-mdc-icon-button';

@Component({
  selector: 'orca-pin-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orca-pin-icon.component.html',
  styleUrl: './orca-pin-icon.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class OrcaPinIconComponent implements AfterViewInit, OnDestroy {
  showSearchHistory: boolean;
  showFavorites: boolean;

  private userAreaButton: HTMLElement | null = null;
  private mutationObserver?: MutationObserver;
  private resizeObserver?: ResizeObserver;

  constructor(
    @Optional() @Inject('MODULE_PARAMETERS') moduleParameters: PinIconConfig | null,
    private host: ElementRef<HTMLElement>
  ) {
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

  ngAfterViewInit(): void {
    // The user area button can render after this component, or be replaced (e.g. after login),
    // so keep watching the page and follow whichever button is current.
    this.resizeObserver = new ResizeObserver(() => this.matchUserAreaButtonSize());
    this.mutationObserver = new MutationObserver(() => this.watchUserAreaButton());
    this.mutationObserver.observe(document.body, { childList: true, subtree: true });
    this.watchUserAreaButton();
  }

  ngOnDestroy(): void {
    this.mutationObserver?.disconnect();
    this.resizeObserver?.disconnect();
  }

  private watchUserAreaButton(): void {
    const button = document.querySelector<HTMLElement>(USER_AREA_BUTTON);
    if (button === this.userAreaButton) return;
    this.resizeObserver?.disconnect();
    this.userAreaButton = button;
    if (button) this.resizeObserver?.observe(button);
  }

  // Until a button is measured, the .scss falls back to 40px.
  private matchUserAreaButtonSize(): void {
    const size = this.userAreaButton?.getBoundingClientRect().height ?? 0;
    if (size > 0) this.host.nativeElement.style.setProperty('--orca-pin-icon-size', `${size}px`);
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
