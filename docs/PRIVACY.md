# Dawn Patrol Privacy Policy

Effective October 12, 2026. See also the [Terms of Service](https://dawnpatrol.casadelfuego.org/terms).

## 1. Summary

Dawn Patrol has no accounts. Your spots, notes, settings and alert addresses stay on your own device. To show a forecast, the app sends a spot's position to weather and ocean data services. We do not sell your data, and we do not use it for advertising today. If that changes, we will update this policy first.

This policy is part of the [Terms of Service](https://dawnpatrol.casadelfuego.org/terms).

## 2. Who we are

Dawn Patrol is operated by M.T. Schwede ("we" or "us"). To reach us about privacy, open Menu, then Report a problem, in the app and describe your question. Leave out sensitive personal information.

## 3. What stays on your device

These are stored in your browser on your device and are not uploaded to us:

- your spots, their beach directions, break depths and any swell directions you pick
- your notes, preferred tide and size, and "Was the forecast right?" reports
- your settings, such as units, dark mode, surfing level and accessibility choices
- your home position, if you set one (a town you searched for, or your location if you tapped Use my location)
- your alert settings and the webhook addresses you enter
- saved forecasts for offline use, for up to 8 spots
- a short error log and your last few taps, used by Report a problem (kept only on the device unless you email it)

Use Export in the Menu to keep a copy or move your data to another device.

## 4. What is sent when you use features

Some features need to send information off your device. Whoever receives a request can also see your device's network address, as with any website.

| Feature | What is sent | Who receives it |
| --- | --- | --- |
| Forecasts, waves, tides, weather, buoys | The position of each spot | Open-Meteo, NOAA (National Weather Service, NDBC, CO-OPS), CDIP, PacIOOS, directly or through our server |
| Extra wind and swell forecasts | The position of each spot you open, rounded to about 5 km | Our server, which asks WeatherAPI.com and Visual Crossing; we cache the answer for 6 hours and do not log it with you |
| Beach or town search | The words you type | Open-Meteo's place-search service, called from your browser |
| Naming a new pin | The position of the pin | BigDataCloud's reverse-geocoding service, called from your browser, to suggest a place name |
| Beach direction | The position of the spot, rounded to about 100 m | Our server, which asks the public Overpass servers (overpass-api.de and overpass.kumi.systems) for OpenStreetMap coastline data; we keep the answer for 7 days |
| Page fonts | The usual web request: your network address and browser details | Google Fonts, when the page loads, and again if you choose the easier-to-read font in Accessibility |
| Links to other sites | Nothing until you tap a link | The site you open, such as Venmo for the donate link, a web search for tide times, or a weather, tide or buoy provider from a Source menu. Source links to raw data can include the spot's position in the address |
| Map and map layers | Which map tiles and images your view needs | OpenStreetMap, NASA GIBS, RainViewer and NOAA chart services |
| Drive times | Your home position and the positions of your spots | Our server and the public OSRM routing service; we do not store them |
| Home town name (only if you tap Use my location) | Your position, rounded to about 1 km | OpenStreetMap Nominatim, called from your browser |
| Break depth for California spots | The position of the spot | Our server, which reads the CDIP model; the depth is then saved on your device |
| California beach advisories | The position of the spot | Our server, which looks up state beach records |
| Scripps Pier algae report | The position of a spot near San Diego | Our server, which reads the public SCCOOS data server; the pier data is the same for everyone and is cached for 3 hours |
| Algae bloom alerts (off unless you turn them on) | A push address your browser gets from its push service (Google, Mozilla or Apple) | Our server, which stores it with a bloom flag and the date, and nothing else: no name, position or spots |
| Alerts | A message with the spot, day and score | Each webhook address you list, and the service behind it |
| Shared links | The spot name, position and directions are inside the link | Anyone you give the link to |
| Report a problem | Nothing, unless you email the saved log yourself | The address you send it to |

Third parties handle what they receive under their own privacy policies.

## 5. Our server, logs and caching

Our server runs on Cloudflare. Cloudflare processes each request and may keep standard technical logs, such as network address and time, under its own policies. We do not build profiles of users.

Our server keeps short-lived copies of public data so it can answer faster, for example weather station lists for a few days, coastline lookups for 7 days and extra forecasts for 6 hours. These copies are keyed to the data, not to you.

Older versions of Dawn Patrol offered optional accounts and shared crews, and push notifications for surf scores (retired). The server code for accounts, sync and crews was removed in 0.1.14, but some data created by older versions may remain in storage. Some of it expires automatically and the rest stays until deleted. The current app does not use these features. To ask us to delete such data, contact us as described in Section 2.

## 6. Browser storage and offline use

Dawn Patrol uses your browser's local storage and an offline cache to remember your spots and settings and to open saved forecasts without a signal. We do not use this storage to track you across other sites.

## 7. Children

Dawn Patrol is for people aged 13 and over. We do not knowingly collect personal information from children under 13. If you believe a child under 13 has used the Service, contact us as described in Section 2.

## 8. Your choices and controls

- **Remove a spot or reset your reports:** use Edit spot, or Reset under "Was the forecast right?".
- **Skip features that send extra data:** do not set a home town, turn off Send alerts, leave Algae bloom alerts off, or leave the map closed.
- **Stop algae bloom alerts:** turn the switch off in the Menu. That deletes your push address from our server. Addresses the push service reports as gone are deleted automatically.
- **Delete everything:** clear this site's data in your browser, or uninstall the app. Because your data lives on your device, that removes it.
- **Export or move your data:** use Export and Import in the Menu.

## 9. Security and California privacy rights

Requests to our server use HTTPS. No system is perfectly secure, so we cannot promise absolute security. Keep your webhook addresses private, because they can work like passwords.

We do not sell or share your personal information as those terms are used in California privacy law, and we keep almost no personal information about you. If you are a California resident and want to ask what we hold, or ask us to delete it, contact us as described in Section 2.

## 10. Changes to this policy

We may update this policy. The updated version will show a new effective date and be available in the app. If a change is material, we will make a reasonable effort to point it out. Using the Service after a change takes effect means you accept the updated policy.
