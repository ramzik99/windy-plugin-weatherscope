# WeatherScope

**Every detail. One clear forecast.** A Meteoblue-first point-forecast workspace for Windy.

Version 0.5.0 is published and live-checked on Windy's hosting. Forecast Desk provides a seven-day overview with provider predictability and expandable meteorological detail. Distribution uses an installation URL; public-gallery review has not been requested.

## Install

In [Windy Plugins](https://www.windy.com/plugins), choose **Load plugin directly from URL** and paste:

https://windy-plugins.com/458307/windy-plugin-weatherscope/0.5.0/plugin.min.js

After installation, [open WeatherScope](https://www.windy.com/plugin/weatherscope). See [validation details](VALIDATION.md) for tested coverage and limitations.

## Winter tools

Wintry Forecast is integrated into the **Details → Winter** tool: snowline, terrain-aware precipitation type, estimated new snow, next wintry period, 144-hour forecast, interactive sounding and optional map contours. Uses explicitly labelled ECMWF profiles; the general baseline remains Meteoblue. [Integration details and attribution](WINTER-INTEGRATION.md).

## At a glance

- Seven-day overview with shared-scale temperature range bars, complete-day precipitation and aligned Meteoblue predictability. Select a day for detail.
- Meteoblue baseline, with explicit ECMWF, GFS and ICON selection and comparison at identical valid times.
- Temperature/dew-point profile, wind hodograph and pressure-level table.
- Calculated K index, Total Totals, 850–500 hPa lapse rate and vector shear, and bracketed freezing-level estimate when required inputs are available above model terrain.
- Expandable Meteorology: surface diagnostics, temperature/dew-point profile, pressure-level table, calculations and exact-time model comparison. A 24-hour temperature chart and collapsible interval table keep the main view simple.
- Search, inspect and pin every returned time-series field; export the complete response as JSON.
- Coverage checklist, source/run metadata, named saved locations, units and UTC/local-time preferences.

Missing values stay missing. Meteoblue is never silently replaced by another model. Unknown fields retain their raw encoding. Pressure-level shear is not 0–6 km shear, predictability is not rain probability, and the freezing-level estimate is not a snow level.

See [parameter coverage](PARAMETER-AUDIT.md), [validation status](VALIDATION.md) and [release notes](RELEASE-NOTES.md). CAPE/CIN, parcel diagnostics, SRH, observations and spatial diagnostics are not implemented.

## Preview

Download and open `preview.html` in a browser. It is self-contained and clearly labelled **synthetic sample data**. It does not fetch weather.

## Development

With Node.js 22 or newer:

```sh
npm ci
npm test
npm run build
npm run preview:build
npm run preview
```

The preview server opens at http://127.0.0.1:9998. Compiled plugin files are in `dist/`.

## Test in Windy

1. Run `npm start`.
2. Open https://localhost:9999/plugin.js. The official template uses a local development certificate; review any browser warning yourself.
3. Sign in to https://www.windy.com/developer-mode and load that local plugin URL.
4. Open WeatherScope, select a point and inspect **Coverage** and **Parameters** to verify the actual fields available for your account and location.

Windy's access conditions apply. No separate Meteoblue API product is purchased or connected.

## Publish future versions

The manual **Publish WeatherScope to Windy** GitHub Actions workflow builds and uploads the plugin after a repository secret named `WINDY_API_KEY` is configured with a Windy Plugins API key. Never put that key in source files. See [Windy's publishing instructions](https://docs.windy-plugins.com/getting-started/publishing-plugin.html).

The current configuration is `private: true`, for installation by a share link. Public gallery inclusion is a separate Windy review process. Version 0.4.0 was uploaded directly using Windy's documented endpoint. The optional GitHub workflow has not been configured or run.

## Attribution

Build tooling is adapted from the [official Windy plugin template](https://github.com/windycom/windy-plugin-template). Its dependencies retain their own licenses. WeatherScope application code is ISC licensed.




