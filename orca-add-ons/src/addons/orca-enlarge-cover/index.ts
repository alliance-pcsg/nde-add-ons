import { AddonRuntimeProfile } from '../addon-profile.types';
import { OrcaEnlargeCoverComponent } from '../../app/orca-enlarge-cover/orca-enlarge-cover.component';

export const orcaEnlargeCoverProfile: AddonRuntimeProfile = {
  key: 'orca-enlarge-cover',
  buildName: 'orca-enlarge-cover',
  selectorComponentMap: new Map<string, any>([
    ['nde-record-image-after', OrcaEnlargeCoverComponent]
  ])
};
