# External Search NDE Add-on

## Details

- Name: `external-search`
- URL: `https://alliance-pcsg.github.io/nde-add-ons/orca-external-search/`
- Configuration JSON Template: [external-search.json](./orca-external-search.json)
- Placement: `nde-search-bar-container-after`
- Component Folder: [`src/app/orca-display-mmsid`](../../app/orca-external-search)

## Description

This add-on adds external links for WorldCat and Google Scholar to the top of the search results filter panel. 

## Configuration

The component accepts the following configuration parameters:

| Parameter | Description |
|---|---|
| `worldcatString` | WorldCat search URL prefix |
| `worldcatBrandName` | Display name for the WorldCat link |
| `worldcatLogoUrl` | URL of the WorldCat logo image |
| `googleScholarLogoUrl` | URL of the Google Scholar logo image |

Example configuration:

```json
{
  "worldcatString": "uwashington.on.worldcat.org/search?databaseList=&queryString=",
  "worldcatBrandName": "UW WorldCat",
  "worldcatLogoUrl": "https://orbiscascade-washington.primo.exlibrisgroup.com/nde/custom/01ALLIANCE_UW-UW_NDE/assets/images/worldcat_logo.png",
  "googleScholarLogoUrl": "https://orbiscascade-washington.primo.exlibrisgroup.com/nde/custom/01ALLIANCE_UW-UW_NDE/assets/images/google_logo.png"
}
```

If you use an empty configuration file, the following defaults are used:

| Parameter | Default |
|---|---|
| `worldcatString` | `search.worldcat.org/search?q=` |
| `worldcatBrandName` | `WorldCat` |
| `worldcatLogoUrl` | `https://search.worldcat.org/favicons/favicon-32x32.png` |
| `googleScholarLogoUrl` | `https://scholar.google.com/favicon.ico` |

## Example

See [orca-external-search.json](./orca-external-search.json) for a sample configuration.
