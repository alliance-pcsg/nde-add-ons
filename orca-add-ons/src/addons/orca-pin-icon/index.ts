import { AddonRuntimeProfile } from '../addon-profile.types';
import { OrcaPinIconComponent } from '../../app/orca-pin-icon/orca-pin-icon.component';

export const orcaPinIconProfile: AddonRuntimeProfile = {
  key: 'orca-pin-icon',
  buildName: 'orca-pin-icon',
  selectorComponentMap: new Map<string, any>([
    ['nde-user-area-before', OrcaPinIconComponent]
  ])
};
