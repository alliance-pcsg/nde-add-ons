import { AddonRuntimeProfile } from '../addon-profile.types';
import { OrcaHathiTrustComponent } from '../../app/orca-hathi-trust/orca-hathi-trust.component';

export const orcaHathiTrustProfile: AddonRuntimeProfile = {
  key: 'orca-hathi-trust',
  buildName: 'orca-hathi-trust',
  selectorComponentMap: new Map<string, any>([
    ['nde-online-availability-before', OrcaHathiTrustComponent]
  ])
};
