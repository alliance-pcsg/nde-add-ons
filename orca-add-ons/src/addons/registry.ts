import { AddonRuntimeProfile } from './addon-profile.types';
import { orcaTestBannerProfile } from './orca-test-banner';
import { orcaEnlargeCoverProfile } from './orca-enlarge-cover';
import { orcaExternalSearchProfile } from './orca-external-search';
import { orcaDisplayMmsidProfile } from './orca-display-mmsid';
import { orcaTopBannerProfile } from './orca-top-banner';

const addonProfiles: Record<string, AddonRuntimeProfile> = {
  'orca-test-banner': orcaTestBannerProfile,
  'orca-enlarge-cover': orcaEnlargeCoverProfile,
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
