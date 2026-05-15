# Display MMSID NDE Add-on

## Details

- Name: `orca-display-mmsid`
- URL: `https://alliance-pcsg.github.io/nde-add-ons/orca-display-mmsid/`
- Configuration JSON Template: [display-mmsid.json](./orca-display-mmsid.json)
- Placement: `nde-full-display-details-after`
- Component Folder: [`src/app/orca-display-mmsid`](../../app/orca-display-mmsid)

## Description

This add-on adds the institutional zone and network zone MMS IDs to the full record display, when those respective MMS IDs exist.

## Configuration

All parameters are required. The component will show nothing until all four are set.

| Parameter | Description |
|---|---|
| `izSuffix` | The numeric suffix that identifies an IZ MMS ID (e.g. `1452` for UW) |
| `instCode` | The Alma institution code used in the SRU query (e.g. `01ALLIANCE_UW`) |
| `sruHost` | The Alma SRU hostname for your region (e.g. `na01.alma.exlibrisgroup.com`) |
| `nzCode` | The network zone ISIL code used in 035 subfields (e.g. `EXLNZ-01ALLIANCE_NETWORK`) |

Example configuration:

```json
{
  "izSuffix": "1452",
  "instCode": "01ALLIANCE_UW",
  "sruHost": "na01.alma.exlibrisgroup.com",
  "nzCode": "EXLNZ-01ALLIANCE_NETWORK"
}
```

## Example

See [orca-display-mmsid.json](./orca-display-mmsid.json) for a sample configuration.
