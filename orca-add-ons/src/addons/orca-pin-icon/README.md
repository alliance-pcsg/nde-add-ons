# Orca Pin Icon NDE Add-on

## Details

- Name: `orca-pin-icon`
- URL: `https://alliance-pcsg.github.io/nde-add-ons/orca-pin-icon/`
- Configuration JSON Template: [orca-pin-icon.json](./orca-pin-icon.json)
- Placement: `nde-user-area-before`
- Component Folder: [`src/app/orca-pin-icon`](../../app/orca-pin-icon)
- Component Selector: `orca-pin-icon`

## Description

Adds two icons to the header user area:

- A clock icon that links to the patron's search history (`account/searchHistory`), with a "Click to go to search history" tooltip.
- A bookmark icon to the right of it that links to the patron's saved records (`account/favorites`), with a "Click to go to saved records" tooltip.

Both icons show by default. Either can be hidden with the `hideSearches` or `hideFavorites` setting. When both show, there is 44px of space between them.

Both links keep the current page's `vid` and `lang` parameters, so they work in any institution's view.

The icons are hidden on screens 550px wide or narrower.

## Configuration

All settings are optional. The colour settings apply to both icons. By default each icon takes the colour of the header text around it, and hovering shows a light circle of that same colour behind the icon, so it fits any header colour without configuration.

You must still upload a configuration file in Alma, even if every value is blank. Without it, Alma leaves the add-on out of the view configuration and Primo never loads it, and the page shows no icon and no errors. The [orca-pin-icon.json](./orca-pin-icon.json) template has every setting blank and can be uploaded as is. An empty object (`{}`) also works.

| Field | Type | Required | Description |
|---|---|---|---|
| `iconColor` | string | No | CSS colour for the icon. Leave blank to use the header text colour. |
| `hoverBackgroundColor` | string | No | CSS colour for the circle behind the icon on hover. Leave blank for a light tint of the icon colour. |
| `hoverIconColor` | string | No | CSS colour for the icon on hover. Leave blank to keep the normal icon colour. |
| `hideSearches` | number | No | Set to `1` to hide the search history icon. Leave blank to show it. |
| `hideFavorites` | number | No | Set to `1` to hide the saved records icon. Leave blank to show it. |

### Example: white icon with a gold hover

```json
{
  "iconColor": "#ffffff",
  "hoverBackgroundColor": "rgb(255, 199, 0)",
  "hoverIconColor": "#000000"
}
```

## Troubleshooting

If the icon doesn't appear, check whether Primo is loading the add-on. Open the view's public configuration in a browser, replacing the host and `vid` with your own:

```
https://<your-primo-host>/primaws/rest/pub/configuration/vid/<vid>
```

For example: `https://orbiscascade-washington-psb.primo.exlibrisgroup.com/primaws/rest/pub/configuration/vid/01ALLIANCE_UW:wade`

Search the response for `ndeAddons`. It should include an `orca-pin-icon` entry with the URL `https://alliance-pcsg.github.io/nde-add-ons/orca-pin-icon/`. If the entry is missing, the problem is in the Alma add-on configuration, not the add-on code. Check that the add-on is attached to the right view, is saved, and has a configuration file uploaded.
