import { AddonRuntimeProfile } from '../addon-profile.types';
import { OrcaDisplayMmsidComponent } from '../../app/orca-display-mmsid/orca-display-mmsid.component';

export const orcaDisplayMmsidProfile: AddonRuntimeProfile = {
  key: 'orca-display-mmsid',
  buildName: 'orca-display-mmsid',
  selectorComponentMap: new Map<string, any>([
    ['nde-full-display-details-after', OrcaDisplayMmsidComponent]
  ])
};
