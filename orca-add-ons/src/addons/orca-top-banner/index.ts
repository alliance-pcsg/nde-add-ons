import { AddonRuntimeProfile } from '../addon-profile.types';
import { OrcaTopBannerComponent } from '../../app/orca-top-banner/orca-top-banner.component';

export const orcaTopBannerProfile: AddonRuntimeProfile = {
  key: 'orca-top-banner',
  buildName: 'orca-top-banner',
  selectorComponentMap: new Map<string, any>([
    ['nde-header-before', OrcaTopBannerComponent]
  ])
};
