# Validation — WeatherScope 0.3.1

Verified 21 September 2026.

- Local build passes; all 15 automated data-semantics tests pass.
- Hosted by Windy: https://windy-plugins.com/458307/windy-plugin-weatherscope/0.3.1/plugin.min.js
- Installed and opened on Windy at sample point Basel (47.56, 7.59), with Meteoblue selected.
- Actual response exposed 169 distinct fields: surface temperature/dew point/wind/gust/pressure/precipitation, daily predictability and pressure-level temperature, humidity, wind and height data.
- Live profile displayed calculated lapse rate, pressure-level vector shear, bracketed freezing crossing and hodograph. Upper-air dew-point values were absent; K and Total Totals were withheld.
- ECMWF, GFS and ICON comparisons loaded at matching valid times.
- Provider run metadata displayed 19 September 00:00 UTC for Meteoblue. It is reported as supplied, not relabelled as a fresh model cycle.
- Synthetic preview checked at desktop and 390px mobile width, including saved points, time selection, sticky navigation and automatic comparisons.

This verifies the tested account, point and returned times, not every location or weather regime. CAPE/CIN, parcel ascent, SRH and observations are not implemented. The plugin is shareable by URL; Windy public-gallery review has not been requested.
