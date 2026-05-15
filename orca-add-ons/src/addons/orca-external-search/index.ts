import { AddonRuntimeProfile } from '../addon-profile.types';
import { OrcaExternalSearchComponent } from '../../app/orca-external-search/orca-external-search.component.spec';

export const externalSearchAddonProfile: AddonRuntimeProfile = {
  key: 'external-search',
  buildName: 'orca-external-search',
  selectorComponentMap: new Map<string, any>([
    ['nde-search-filters-side-nav-before', OrcaExternalSearchComponent]
  ])
};
