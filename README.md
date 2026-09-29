# SurfMath

Honest math for surfing: wave power (height squared times period), board volume by weight and skill, realistic rides per crowded session, wetsuit thickness by water temperature, swell travel time, and rip-current escape.

## Run it

Static site. Open `index.html` (landing) or `app.html` (the calculator). On GitHub Pages the root serves the landing page.

## What it computes

- **Wave power** - energy flux scales with height squared times period. A 6 ft wave at the same period packs four times the power of a 3 ft wave; a long-period groundswell at 3 ft out-punches a windswell at 5.
- **Board volume** - weight in kilograms times a skill factor: ~1.0 L/kg to learn, 0.6 intermediate, 0.4 advanced. Renting small to "progress faster" mostly buys frustration.
- **Rides per session** - sets per hour times waves per set, times honest positioning, divided by the crowd. The number is humbling.
- **Wetsuit** - thickness bands from boardshorts at 72F+ to 6/5mm under 43F.
- **Swell travel** - deep-water group speed is about 1.5 knots per second of period; a 14-second swell crosses 1,000 nautical miles in about two days.
- **Rip escape** - swim parallel at a surf-realistic pace, not against the current.

## Files

- `index.html` - landing page
- `app.html` - the calculator
- `engine.js` - pure math (also usable from Node: `require('./engine.js')`)
