# Wintry Forecast integration

WeatherScope 0.4.0 incorporates Wintry Forecast 301.0.2 from ramzik99/wintry-forecast (source snapshot 850da60). Original MIT license: src/winter/LICENSE.

- Winter tab: terrain-aware precipitation type, thermal snowline, current/next wintry period, estimated new snow, 144-hour graph, interactive sounding and image/copy exports.
- Shared WeatherScope location, saved points, and Windy forecast timestamp. Existing Wintry saved locations are imported once (up to 30).
- Explicit ECMWF winter source; Meteoblue remains the general baseline. Winter times retain the original device-local timezone; cycle labels are UTC.
- Winter metric/imperial units are in WeatherScope Settings.
- Contours and terrain hatching are optional. Their original elevation palette, sampling, caches and calculations are retained. They load only on request while the Winter tab is active, and are removed when leaving the tab or closing the plugin.
- Existing winter calculation tests run with WeatherScope tests: 57 passing.
- Original point popup is integrated into the side panel. The graph and sounding are embedded below it; no second location picker or separate saved-place menu is required. Use Windy's search and click the map or a saved WeatherScope point.
- Event listener cleanup uses the shared Windy event name and handler, preventing stale winter listeners after switching tabs.

The original Wintry Forecast repository and published plugin are preserved. Snowline and accumulation remain diagnostic estimates, with missing data and low confidence retained.
