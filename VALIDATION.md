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
