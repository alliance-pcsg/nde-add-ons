import { AddonRuntimeProfile } from './addon-profile.types';
import { orcaTestBannerProfile } from './orca-test-banner';
import { orcaTopBannerProfile } from './orca-top-banner';
import { orcaExternalSearchProfile } from './orca-external-search';
import { orcaDisplayMmsidProfile } from './orca-display-mmsid';

const addonProfiles: Record<string, AddonRuntimeProfile> = {
  'orca-test-banner': orcaTestBannerProfile,
  'orca-external-search': orcaExternalSearchProfile,
  'orca-display-mmsid': orcaDisplayMmsidProfile,
  'orca-top-banner': orcaTopBannerProfile
};

export function resolveAddonRuntimeProfile(addonKey: string): AddonRuntimeProfile {
  const profile = addonProfiles[addonKey];

  if (!profile) {
    throw new Error(`Unknown add-on runtime profile "${addonKey}".`);
  }

  return profile;
}
