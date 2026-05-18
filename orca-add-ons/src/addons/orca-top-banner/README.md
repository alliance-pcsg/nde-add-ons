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
| `startDateTime` | string | No | ISO 8601 date-time string (e.g. `2026-06-01T08:00:00-07:00`). Banner will not display before this time. Omit to show immediately. See [Date/time format and time zones](#datetime-format-and-time-zones). |
| `endDateTime` | string | No | ISO 8601 date-time string (e.g. `2026-06-01T12:00:00-07:00`). Banner will not display after this time. Omit to show indefinitely. See [Date/time format and time zones](#datetime-format-and-time-zones). |

### Date/time format and time zones

`startDateTime` and `endDateTime` use the [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date-time format: `YYYY-MM-DDTHH:MM:SS`. The component evaluates these values against the **user's local browser clock**, so a string without an explicit timezone offset will be interpreted in whatever timezone the user's device is set to — which may not be what you intend.

For predictable, institution-specific behavior, always include an explicit UTC offset:

| Timezone | Offset | Active period |
|---|---|---|
| Pacific Standard Time (PST) | `-08:00` | Early November – mid March |
| Pacific Daylight Time (PDT) | `-07:00` | Mid March – early November |

**Examples:**

```
2026-06-01T08:00:00-07:00   →  8:00 AM PDT on June 1, 2026
2026-12-15T06:00:00-08:00   →  6:00 AM PST on December 15, 2026
2026-06-01T08:00:00Z        →  8:00 AM UTC (= 1:00 AM PDT) — avoid unless you intend UTC
```

Using the wrong offset (or no offset) will cause the banner to appear or disappear at the wrong time for users in your target timezone.

### Example — Maintenance window alert

```json
{
  "message": "Scheduled maintenance: the system will be unavailable Saturday June 1 from 8–10 AM.",
  "backgroundColor": "#b22222",
  "foregroundColor": "#ffffff",
  "logoUrl": "assets/icons/warning.svg",
  "startDateTime": "2026-05-28T00:00:00-07:00",
  "endDateTime": "2026-06-01T11:00:00-07:00"
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
