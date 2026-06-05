import { AddonRuntimeProfile } from './addon-profile.types';
import { orcaTestBannerProfile } from './orca-test-banner';
import { orcaEnlargeCoverProfile } from './orca-enlarge-cover';

const addonProfiles: Record<string, AddonRuntimeProfile> = {
  'orca-test-banner': orcaTestBannerProfile,
  'orca-enlarge-cover': orcaEnlargeCoverProfile
};

export function resolveAddonRuntimeProfile(addonKey: string): AddonRuntimeProfile {
  const profile = addonProfiles[addonKey];

  if (!profile) {
    throw new Error(`Unknown add-on runtime profile "${addonKey}".`);
  }

  return profile;
}
