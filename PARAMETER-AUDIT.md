# Meteoblue coverage audit

Checked 21 September 2026. Meteoblue is a suitable **baseline**, but complete coverage of all planned meteorological diagnostics is not established. A Meteoblue product offering and Windy's exposed Meteoblue fields are different interfaces.

## Evidence

1. Windy's Meteoblue AI meteogram was inspected at a sample point in Basel. It displayed temperature, dew point, wind/gusts, cloud/precipitation and cloud-base rows. This verifies UI availability at that location, not every corresponding plugin response field.
2. Windy's official documentation explicitly supports Meteoblue soundings and says Meteoblue is not supported as the main map model: https://docs.windy-plugins.com/api/interfaces/DataSpecifications.DataSpecifications.html#soundingproduct
3. The installed official `@windycom/plugin-devtools` 3.0.4 schema defines optional meteogram, airgram and sounding includes. It documents temperature, humidity, wind, wind direction, cloud fraction and geopotential heights across pressure levels. This is a shared schema, not a guarantee that each model returns all fields.
4. Meteoblue's own catalogue documents Basic, Clouds, Air, Agro, Profile Series and other packages: https://docs.meteoblue.com/en/meteo/variables/weather-variables
5. Windy sign-in and developer terms are complete. Live custom-plugin loading remains blocked by the local certificate warning; no raw Meteoblue plugin response has been verified.

## Coverage by requirement

| Requirement | Finding | Implementation treatment |
|---|---|---|
| Surface temperature, dew point, wind/gusts, precipitation, cloud base | Verified in Windy's Meteoblue UI at sample point | Read returned fields; no assumed zeros |
| Pressure | Documented in shared Windy point schema | Label pressure without asserting MSL; provider schema says surface pressure while direct Meteoblue Basic documents MSL |
| Upper-air T, Td, RH, wind, heights | Sounding support confirmed; field/level completeness requires response inspection | Request sounding/airgram/meteogram; report actual coverage |
| Relative humidity, forecast pressure change | Derivable when same-source inputs and valid times exist | Label as calculated, retain method |
| CAPE, CIN, lifted index, helicity | Documented in Meteoblue's own Air package; not guaranteed by Windy's point schema | Additional Meteoblue package access or validated calculations needed |
| Lapse rate, freezing level, K index, Total Totals | Calculable with adequate same-time profiles | v0.2 calculates 850–500 lapse rate, first bracketed freezing crossing, K and TT with required inputs above model terrain; live validation pending |
| LCL, LFC, EL | Requires validated parcel calculations | Not implemented |
| 0–6 km shear, SRH | Needs sufficient vertical wind/height coverage and storm-motion definition for SRH | Do not infer from isolated pressure levels |
| Precipitable water | No direct field confirmed in inspected Windy schema | Validate profile integration or obtain direct field |
| Convergence, vorticity, advection, frontogenesis | Needs spatial fields, not a single point profile | Additional gridded data interface needed |
| Observations, radar, satellite, lightning | Separate observational products | Not supplied by the baseline forecast request |
| Wave, air-quality and land-surface variables | Separate specialized products/packages | Not requested in this first build; no invented fields |
| Predictability | Windy summary schema includes optional daily predictability | Display available daily index; not treated as precipitation probability |
| Model spread | Multiple models can be requested | Compare identical valid times; do not imply independent ensemble members |

## Data rules

- Preserve all arrays returned in forecast, meteogram, airgram and sounding sections. Unknown fields remain visible in their original units/encoding, labelled raw.
- Preserve full response, daily summaries, provider headers and any merged-source metadata in the JSON export.
- Do not silently replace Meteoblue with another model or silently fill its missing fields from another source.
- Do not assume one-hour resolution. This version requests 3-hour steps and follows the actual timestamps supplied.
- Precipitation is a per-step amount. Windy's schema uses start-of-segment timestamps; Meteoblue's direct API documents end-of-interval timestamps. These conventions must not be mixed. The UI displays the provider timestamp without asserting an interval boundary.
- Forecast run times may be absent in Meteoblue responses; absence is explicitly displayed.
- Profile levels may lie beneath terrain. Raw profiles are shown; derived diagnostics require known model terrain and above-ground inputs. The hodograph excludes below-ground levels. Parcel-based hazard conclusions are not drawn.

## Conclusion

Use Meteoblue for the default local briefing and available profile data. Complete meteorological coverage requires verified additional data sources and validated diagnostic calculations. The first build is a working data-inspection dashboard, not a claim that all previously proposed diagnostics are operational.

