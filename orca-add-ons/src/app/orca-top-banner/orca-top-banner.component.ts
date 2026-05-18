import { Component, Inject, OnInit, Optional } from '@angular/core';
import { NgStyle } from '@angular/common';

interface TopBannerConfig {
  message?: string;
  backgroundColor?: string;
  foregroundColor?: string;
  fontSize?: string;
  fontWeight?: string;
  fontFace?: string;
  logoUrl?: string;
  startDateTime?: string;
  endDateTime?: string;
}

@Component({
  selector: 'orca-top-banner',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './orca-top-banner.component.html',
  styleUrls: ['./orca-top-banner.component.scss']
})
export class OrcaTopBannerComponent implements OnInit {
  isVisible = false;
  config: TopBannerConfig = {};

  constructor(@Optional() @Inject('MODULE_PARAMETERS') private moduleParameters: TopBannerConfig) {}

  ngOnInit(): void {
    this.config = this.moduleParameters ?? {};
    this.isVisible = !!this.config.message && this.isWithinDateWindow();
  }

  get bannerStyles(): Record<string, string> {
    const styles: Record<string, string> = {
      'background-color': this.config.backgroundColor || '#b22222',
      'color': this.config.foregroundColor || '#ffffff'
    };
    if (this.config.fontSize) styles['font-size'] = this.config.fontSize;
    if (this.config.fontWeight) styles['font-weight'] = this.config.fontWeight;
    if (this.config.fontFace) styles['font-family'] = this.config.fontFace;
    return styles;
  }

  private isWithinDateWindow(): boolean {
    const { startDateTime, endDateTime } = this.config;
    if (!startDateTime && !endDateTime) return true;
    const now = new Date();
    if (startDateTime && new Date(startDateTime) > now) return false;
    if (endDateTime && new Date(endDateTime) < now) return false;
    return true;
  }
}
