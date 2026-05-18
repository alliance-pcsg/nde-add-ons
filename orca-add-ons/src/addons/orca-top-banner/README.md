# Orca Top Banner NDE Add-on

## Details

- Name: `orca-top-banner`
- URL: `https://alliance-pcsg.github.io/nde-add-ons/orca-top-banner/`
- Configuration JSON Template: [orca-top-banner.json](./orca-top-banner.json)
- Placement: `nde-header-before`
- Component Folder: [`src/app/orca-top-banner`](../../app/orca-top-banner)
- Component Selector: `orca-top-banner`

## Description

Displays a full-width alert banner above the Primo NDE header. Intended for timely, important notices such as system outages, safety alerts, and scheduled maintenance windows.

The banner is only rendered when a `message` value is present in the configuration. An optional date/time window can be configured so the banner appears automatically during a specific period and disappears when that period ends — useful for pre-announcing maintenance windows without requiring manual intervention.

## Configuration

Upload [orca-top-banner.json](./orca-top-banner.json) as the configuration template in Alma. All fields are optional except `message`.

| Field | Type | Required | Description |
|---|---|---|---|
| `message` | string | Yes | The alert text displayed in the banner. The banner will not render if this is empty. |
| `backgroundColor` | string | No | CSS color value for the banner background. Defaults to `#b22222` (dark red). |
| `foregroundColor` | string | No | CSS color value for the banner text. Defaults to `#ffffff` (white). |
| `logoUrl` | string | No | URL or asset path for an icon displayed to the left of the message. Omit or leave blank to show no icon. |
| `startDateTime` | string | No | ISO 8601 date-time string (e.g. `2026-06-01T08:00:00`). Banner will not display before this time. Omit to show immediately. |
| `endDateTime` | string | No | ISO 8601 date-time string (e.g. `2026-06-01T12:00:00`). Banner will not display after this time. Omit to show indefinitely. |

### Example — Maintenance window alert

```json
{
  "message": "Scheduled maintenance: the system will be unavailable Saturday June 1 from 8–10 AM.",
  "backgroundColor": "#b22222",
  "foregroundColor": "#ffffff",
  "logoUrl": "assets/icons/warning.svg",
  "startDateTime": "2026-05-28T00:00:00",
  "endDateTime": "2026-06-01T11:00:00"
}
```

### Example — Always-on safety alert

```json
{
  "message": "For campus emergencies call 911. For non-emergency safety concerns call (555) 867-5309.",
  "backgroundColor": "#4a4a4a",
  "foregroundColor": "#ffffff",
  "logoUrl": ""
}
```
