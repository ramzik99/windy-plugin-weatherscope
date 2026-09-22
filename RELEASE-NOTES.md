# WeatherScope 1.0.0 — Forecast Desk

The first complete WeatherScope release. The elevation workflow is rebuilt as a simple visual sequence: compare real and model terrain, confirm the site height, choose an atmospheric lapse-rate preset, and compare the original forecast with the what-if result. A terrain cross-section, temperature-change scale and clear source/result labels make the height relationship readable at a glance. Professional notes stay collapsed until needed. ECMWF remains the default, all provider values remain intact, and the estimate resets when location or model changes.

# WeatherScope 0.6.2 — Optional elevation temperature estimate

Adds an opt-in, selected-time temperature estimate using terrain or entered elevation and an editable lapse rate, with original and estimated values side by side. Handles negative elevations, inversions, missing inputs, invalid ranges and Celsius/Fahrenheit display; resets assumptions when point or model changes. Provider forecasts remain intact. Also normalizes known model identifiers to remove false ECMWF-versus-ECMWF notices and duplicate comparison sources.

# WeatherScope 0.6.1 — Location elevation

A compact elevation card shows terrain height and the difference from the selected forecast model. Tap it for model height, data provenance and practical correction guidance. Forecast values remain unchanged. Terrain failures do not block forecasts; requests are cached and guarded against stale location responses. Repaired dependency lock metadata from the installed dependency manifest.

# WeatherScope 0.6.0 — Parameter Library

Adds direct access from the main forecast, multi-word search, category/pressure-level filters, pinned and availability views, and expandable details for every returned field. Creative visuals include mini trends, rainfall bars, a directional compass, percentage rings and a clickable availability timeline. Source metadata, original values and paginated forecast tables are accessible in each field.

77 tests and both builds pass. ECMWF remains the default; Meteoblue remains removed.

# WeatherScope 0.5.2

ECMWF is the default for new and existing installations. A one-time preference migration selects ECMWF while preserving locations, units and thresholds. Meteoblue is removed from model selection and comparisons. GFS and ICON remain optional. Daily predictability appears only when supplied by the selected source.

# WeatherScope 0.5.1

Fixes the three-day request limit: request eight days of hourly data to cover the seven-day overview and its interval boundaries. Use dated provider daily minimum, maximum and predictability in the forecast point calendar, avoiding device-timezone gaps and mixing adjacent days.

Weather values now display whole numbers, including Winter. Positive precipitation below one unit displays as <1 instead of misleading zero; raw exports and calculations preserve precision. Coordinates and raw metadata preserve their necessary precision.

The timeline has a dedicated mint track, larger thumb, Previous/Next buttons, date endpoints, accessible valid-time text and working keyboard navigation. Forecast notes are collapsed to keep the daily view compact.

74 tests pass. The forecast and display fixes were tested in Windy via private 0.5.1-rc.1 before final publication. See VALIDATION.md for feature checks and limitations.

My location requests browser location only when tapped, validates coordinates and handles denial, unavailable service and timeouts. It does not start background tracking.


