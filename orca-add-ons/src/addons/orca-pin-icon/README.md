# Orca Pin Icon NDE Add-on

## Details

- Name: `orca-pin-icon`
- URL: `https://alliance-pcsg.github.io/nde-add-ons/orca-pin-icon/`
- Configuration JSON Template: [orca-pin-icon.json](./orca-pin-icon.json)
- Placement: `nde-user-area-before`
- Component Folder: [`src/app/orca-pin-icon`](../../app/orca-pin-icon)
- Component Selector: `orca-pin-icon`

## Description

Adds a bookmark icon to the header user area that links to the patron's saved records (`account/favorites`). Hovering or focusing the icon shows a "Click to go to saved records" tooltip. The link keeps the current page's `vid` and `lang` parameters, so it works in any institution's view.

The icon is hidden on screens 550px wide or narrower.

## Configuration

No configuration parameters are required. Upload the empty [orca-pin-icon.json](./orca-pin-icon.json) template in Alma.
