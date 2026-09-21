# WeatherScope 0.3.0

A redesigned summary, clearer typography, larger controls, sticky navigation and responsive cards. Adds a temperature/rain trend with missing-data gaps preserved, named saved points and automatic model comparisons on opening Compare. Preview verified at desktop and 390px mobile width; live Windy validation remains pending.

# WeatherScope 0.2.0

Meteoblue-first point forecasting for Windy, with source-labelled comparisons and complete returned-field inspection.

## Changes

- Renamed Synoptic to WeatherScope, including package name and route.
- Added a forecast-time slider shared by all views.
- Added 24-hour sampled temperature range, complete-interval precipitation total, and supplied daily predictability.
- Added K index, Total Totals, 850–500 hPa vector shear and lapse rate, plus a bracketed freezing crossing. Required inputs must share source and valid time. Terrain-dependent indices require model elevation and above-ground levels.
- Added a wind hodograph and location naming through Windy's reverse-name service.
- Remembered baseline, display preferences, pins, saved coordinates and alert thresholds.
- Added release workflows and a secret-safe Windy upload script.

## Method references

- K index: https://unidata.github.io/MetPy/latest/api/generated/metpy.calc.k_index.html
- Total Totals: https://unidata.github.io/MetPy/latest/api/generated/metpy.calc.total_totals_index.html
- Vector shear: https://unidata.github.io/MetPy/latest/examples/calculations/Bulk_Shear.html

## Scope

This release computes selected point-profile diagnostics. It does not claim to deliver a full parcel-ascent analysis, observed station feed, radar feed, or spatial synoptic diagnostics. Raw returned parameters remain available without fabricated values.

Live integration and publication status are recorded in VALIDATION.md.

