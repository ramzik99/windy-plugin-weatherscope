# Validation — WeatherScope 0.4.0

Verified 21 September 2026.

- Production build passes. Combined suite: 57 tests pass, including original Wintry physics, interval coverage, accumulation, terrain, contour and freshness tests.
- Published: https://windy-plugins.com/458307/windy-plugin-weatherscope/0.4.0/plugin.min.js
- Installed through Windy's plugin URL loader; Winter tab appears in the hosted plugin.
- Basel test: actual ECMWF profiles and Windy terrain loaded. Point card, 144-hour graph, precipitation phases, new-snow guidance and embedded sounding rendered. Terrain 250 m and selected-time snowline 2220 m were displayed in this test response.
- Winter time control updated Windy's timeline and the embedded forecast/sounding time.
- Optional contours rendered across the current map, with six visible contour labels. No console errors were recorded during the winter check.
- Ordinary map click changed the shared point to a Mediterranean Sea test point. Winter updated its terrain and snowline; switching to Brief showed Meteoblue for that same point.
- Leaving Winter removed its map layers. Leaving while contour requests were running also left zero winter contour labels.
- General Meteoblue point response supplied 169 fields; the existing source-labelled forecast remains separate from ECMWF winter diagnostics.

Tests cover selected points, responses and interactions, not every weather regime. Winter phase, snowline and new snow remain model-derived guidance with the original uncertainty and missing-data rules. Public-gallery review has not been requested.

## 0.5.0 Forecast Desk release checks

Production and standalone preview builds pass. All 65 tests pass, including daily boundaries, interval coverage, predictability alignment, missing-data handling and winter diagnostics. Expanded Meteorology and model comparison were checked with labelled synthetic preview data. Live hosted-release verification follows publication.

Hosted 0.5.0 published and installed successfully on 2026-09-22. Live Amman checks passed for Forecast Desk, daily selection, Meteorology profile and calculations, exact-time Meteoblue/ECMWF/GFS/ICON temperature comparison, and integrated ECMWF Winter forecast. No browser console errors were recorded during those checks.

Source limitation: Windy returned a Meteoblue run displayed as 70 hours old, with remaining coverage only through September 23, even after refresh. The seven-day overview therefore leaves later dates unavailable. Provider predictability was shown on aligned dates and withheld on a non-aligned date. Profile dew point was absent, so humidity-dependent indices stayed unavailable. These checks verify behavior, not meteorological accuracy. New-release contour rendering was not rechecked; it was verified in 0.4.0.

Hosted install URL: https://windy-plugins.com/458307/windy-plugin-weatherscope/0.5.0/plugin.min.js
Source release commit: 76be7f7b9e8fa2390dec02a80bd20c092d82ea14
Distribution remains by installation URL, not a public-gallery listing.

## 0.5.1 regression checks — 2026-09-22

Correction to the 0.5.0 report: the missing horizon was caused by our days:3 request, not an established provider limitation. The previous attribution was premature. Requests now use days:8 and step:1. Live responses contain 192 samples and eight dated daily summaries. Daily min/max and predictability now share the provider point-local calendar rather than device-local bins.

Before final publication: production and preview builds pass; 71 automated tests pass. Tests include request horizon, refresh caching, provider errors without substitution, point-calendar day alignment, invalid summaries, daily interval coverage, trace/integer presentation, exact-time comparison, terrain constraints, missing data and Winter calculations.

Private release candidate 0.5.1-rc.1 tested the forecast, formatting and slider fixes before the later My location addition. Live Windy checks: Amman and Reading seven-day lows/highs/predictability; day selection; timeline Home/End/arrows, Previous/Next and Now; refresh; Meteoblue/ECMWF/GFS/ICON source selection; four-model comparison; Meteorology; saved-place navigation; parameter export and coverage metadata. Exported JSON parsed successfully with 192 samples, eight summaries and unrounded raw temperatures.

Preview checks: temperature/wind units, device/UTC time, saved-point persistence through reload, parameter search/pinning/inspection, chart parameter and horizon selection, atmospheric profile/hodograph and model comparison. 390px layout had no horizontal document overflow. Live mobile page reloaded into fullscreen plugin presentation; inspected visually. Temporary viewport override reset.

Winter live checks: ECMWF forecast, sounding, time selection, metric/imperial units, summary copied and inspected, sounding PNG downloaded, contours rendered (five labels) and all labels removed on returning to Briefing. Browser error log was empty at the final live check.

These are regression checks of implemented feature groups, not exhaustive verification of every browser, geography or weather regime. Forecast accuracy has not been measured against observations. Missing upper-air dew points continue to leave K/TT unavailable. Public-gallery submission remains outside this installation-link release.

My location addition: 74 tests now pass, including valid coordinate order, bounded location request, denied/unavailable/timeout errors and invalid coordinates. The preview loading state and timeout fallback were checked; the prior forecast remains visible. Successful hardware geolocation depends on browser permission and the device location service.



Final 0.5.1 installed successfully from https://windy-plugins.com/458307/windy-plugin-weatherscope/0.5.1/plugin.min.js. My location succeeded in live Windy and loaded a new point forecast with seven daily rows. The button returned to its ready state. No device coordinates are recorded in this report.


## 0.5.2 ECMWF default
Production and preview builds pass; all 74 regression tests pass. ECMWF replaces Meteoblue in initial selection; existing preferences migrate once using baselineVersion 2, preserving other settings. Meteoblue is excluded from the available model list and comparisons.


## 0.6.0 Parameter Library
Production and preview builds pass. All 77 tests pass, including combined search/filter behavior, calm zero versus missing values, bounded summaries and honest unmapped-field explanations. Preview checks covered direct access, combined Wind + 850 hPa filters, expanded temperature trend, direction compass, percentage ring, forecast horizon, pagination and pinned filtering. No console errors were recorded. The detailed view was inspected at 390px, with no document overflow. Temporary viewport override reset.


## 0.6.1 Elevation
79 tests and production/preview builds pass. Tests cover missing heights, sea level, negative elevations, response parsing, cache reuse, exact coordinate keys, invalid coordinates and retry after failure. Preview confirms 250 m terrain versus 270 m model, expandable guidance and keyboard toggle. At 390px the elevation content has no horizontal overflow. Forecast values are not elevation-adjusted by WeatherScope; upstream adjustment status remains unverified.
