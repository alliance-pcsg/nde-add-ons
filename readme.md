# Orca Add-Ons and Profiles

This repository hosts multiple add-ons that share the same `customModule-main` base.

## Add-ons

- [`orca-test-banner`](./orca-add-ons/src/addons/orca-test-banner/README.md)
- [`orca-external-search`](./orca-add-ons/src/addons/orca-external-search/README.md)


## Adding a New Component

Creating a new component is the same as in `customModule-main`. Add-on names should use the `orca-` prefix, for example `orca-test-banner`.

Before making changes:

1. Start from the latest `main` branch.
2. Create a new branch for your add-on work.
3. Create the new component inside [`orca-add-ons`](./orca-add-ons).
4. Update the add-on profiles so the new component can be built in this repo.

## Updating Profiles for Build

After creating the component, update the add-on profile files so it can be built in this repo.

1. Add a new add-on entry in [orca-add-ons/addon-profiles.json](./orca-add-ons/addon-profiles.json).

Example:

```json
{
  "addons": {
    "orca-test-banner": {
      "buildName": "orca-test-banner",
      "remoteName": "orcaTestBanner",
      "exposedModule": "./orca-test-banner"
    }
  }
}
```

2. Create a runtime profile file at `orca-add-ons/src/addons/<addon-name>/index.ts`.

Example:

```ts
import { AddonRuntimeProfile } from '../addon-profile.types';
import { OrcaTestBannerComponent } from '../../app/orca-test-banner/orca-test-banner.component';

export const orcaTestBannerProfile: AddonRuntimeProfile = {
  key: 'orca-test-banner',
  buildName: 'orca-test-banner',
  selectorComponentMap: new Map<string, any>([
    ['nde-your-selector', OrcaTestBannerComponent]
  ])
};
```

3. Register the new profile in [orca-add-ons/src/addons/registry.ts](./orca-add-ons/src/addons/registry.ts).

Example:

```ts
import { AddonRuntimeProfile } from './addon-profile.types';
import { orcaTestBannerProfile } from './orca-test-banner';

const addonProfiles: Record<string, AddonRuntimeProfile> = {
  'orca-test-banner': orcaTestBannerProfile
};
```



## Merging Changes

When your add-on changes are ready:

1. Push your branch to GitHub.
2. Create a pull request targeting the `main` branch.
3. After review, merge the pull request into `main`.

## Add-on URL

The GitHub Pages URL for an add-on will look like:

`https://alliance-pcsg.github.io/nde-add-ons/<addon-name>/`

Example:

`https://alliance-pcsg.github.io/nde-add-ons/orca-test-banner/`

## Local Builds

Run build commands from the inner project folder:

```bash
cd orca-add-ons
```

`npm run build` builds all add-ons listed in [orca-add-ons/addon-profiles.json](./orca-add-ons/addon-profiles.json). The build output is written to `orca-add-ons/dist/addons/`, with one folder per add-on.

To build only one add-on for local development, set `ADDON_KEY` in [orca-add-ons/build-settings.env](./orca-add-ons/build-settings.env), then run:

```bash
npm run build:addon
```

Changing `ADDON_KEY` only affects single add-on builds and local generated settings. Leave optional overrides such as `BUILD_NAME`, `REMOTE_NAME`, and `PACKAGE_NAME` commented out unless you need to change the packaged output names.
