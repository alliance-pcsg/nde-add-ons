import { NgModule } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { HathiTrustService } from './hathi-trust.service';
import { HathiTrustApiService } from './hathi-trust-api/hathi-trust-api.service';
import { HathiTrustConfigService } from './hathi-trust-config/hathi-trust-config.service';
import { SearchResultFacade } from './primo-search-result/search-result.facade';

/**
 * Providers for the HathiTrust add-on.
 *
 * The Primo host does not provide HttpClient, and the shared bootstrap in this
 * repo is used by every add-on, so HttpClient is provided here instead.
 * Importing this module into the standalone OrcaHathiTrustComponent puts these
 * providers in one injector shared by every instance of the component, so the
 * HathiTrust API response cache is shared across search results.
 */
@NgModule({
  providers: [
    provideHttpClient(),
    HathiTrustService,
    HathiTrustApiService,
    HathiTrustConfigService,
    SearchResultFacade,
  ],
})
export class HathiTrustProvidersModule {}
