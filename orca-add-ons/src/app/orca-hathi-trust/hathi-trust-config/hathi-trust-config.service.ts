import { Inject, Injectable } from '@angular/core';
import type {
  HathiTrustOptions,
  HathiTrustModuleParameters,
} from './hathi-trust-config.types';
import { normalizeHathiTrustConfig } from './hathi-trust-config.util';

@Injectable()
export class HathiTrustConfigService {
  private readonly options: HathiTrustOptions;

  constructor(
    @Inject('MODULE_PARAMETERS')
    moduleParameters: HathiTrustModuleParameters,
  ) {
    this.options = normalizeHathiTrustConfig(moduleParameters);
  }

  get disableWhenAvailableOnline(): boolean {
    return this.options.disableWhenAvailableOnline ?? true;
  }

  get disableForJournals(): boolean {
    return this.options.disableForJournals ?? false;
  }

  get ignoreCopyright(): boolean {
    return this.options.ignoreCopyright ?? false;
  }

  get matchOnOclc(): boolean {
    return this.options.matchOn?.oclc ?? true;
  }

  get matchOnIsbn(): boolean {
    return this.options.matchOn?.isbn ?? false;
  }

  get matchOnIssn(): boolean {
    return this.options.matchOn?.issn ?? false;
  }

  get matchOnLccn(): boolean {
    return this.options.matchOn?.lccn ?? false;
  }
}
