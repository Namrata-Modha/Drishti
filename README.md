# ✦ Drishti — Vedic Birth Chart Calculator

**Drishti** is a free, open-source Vedic astrology birth chart (Janma Kundali) calculator. Enter a date of birth and get a complete chart with planetary positions, nakshatra placements, Vimshottari dasha timeline, yoga detection, and an AI-powered chart reading — all in the browser, no account needed.

Live at: `drishti.vercel.app`

---

## Features

- **North Indian Kundali SVG** — rendered dynamically from calculated positions, Vedic and Western toggle
- **Pure JavaScript ephemeris** — no external astronomy APIs; calculates planetary positions from Keplerian orbital mechanics
- **Lahiri ayanamsa** — standard sidereal conversion used by the Indian Astronomical Ephemeris
- **Whole sign house system** — traditional Parashari house assignment
- **Vimshottari dasha** — full 120-year cycle with current Mahadasha and Antardasha, calculated from the Moon's nakshatra at birth
- **Yoga detection** — Hamsa, Malavya, Neecha Bhanga Raja, Budhaditya, Gaja Kesari, stelliums
- **Planetary dignity** — exaltation, own sign, debilitation scoring with visual bar chart
- **Elemental distribution** — Fire / Earth / Air / Water planet count
- **AI chart reading** — powered by Gemini 2.5 Flash via a Vercel serverless function; the API key never touches the frontend
- **Flexible input** — birth time and place are optional; missing time defaults to noon with a disclaimer, missing place falls back to timezone-based approximation
- **80+ cities built-in** — India, Canada, US, UK, Australia, UAE, Singapore; manual coordinates fallback

---

## Tech Stack

| Layer | Choice |
|---|---|
| Frontend | React 18 + Vite |
| Charts | Recharts |
| Fonts | Cinzel + EB Garamond (Google Fonts) |
| AI | Google Gemini 2.5 Flash (free tier) |
| API proxy | Vercel serverless function (`api/chat.js`) |
| Deployment | Vercel |
| Database | None — users re-enter birth details each session |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A Google Gemini API key — get one free at [aistudio.google.com](https://aistudio.google.com) (no credit card required)

### Local development

```bash
git clone https://github.com/YOUR_USERNAME/drishti.git
cd drishti
npm install
```

Create a `.env` file in the project root:

```
GEMINI_API_KEY=your_key_here
```

Start the dev server:

```bash
npm run dev
```

Open `http://localhost:5173`. The chart and all tabs work without the API key. The **Ask Chart** tab needs the key — it will show an error locally until the key is set.

> Note: Vercel's serverless `api/` functions don't run during `npm run dev`. To test the AI chat locally, use the [Vercel CLI](https://vercel.com/docs/cli): `npx vercel dev`.

---

## Deploying to Vercel

1. Push the repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → import the repo
3. Vercel auto-detects Vite — build settings fill in automatically
4. Before clicking Deploy: go to **Settings → Environment Variables** → add `GEMINI_API_KEY` with your key
5. Deploy

Vercel's `api/` directory is automatically deployed as serverless functions. The Gemini key lives only on the server side and is never exposed to the browser.

---

## Project Structure

```
drishti/
├── api/
│   └── chat.js          # Vercel serverless function — Gemini API proxy
├── src/
│   ├── main.jsx         # React entry point
│   ├── App.jsx          # All UI components (InputForm, Dashboard, tabs)
│   ├── ephemeris.js     # Planetary position calculations (pure JS)
│   └── cities.js        # City → lat/lon/timezone lookup table
├── index.html           # Entry HTML with Google Fonts
├── vite.config.js
├── vercel.json
└── package.json
```

---

## Ephemeris Accuracy

Positions are calculated from Keplerian orbital elements using the algorithms from Jean Meeus, *Astronomical Algorithms* (2nd ed.). The Moon uses a 40-term series.

| Body | Typical accuracy |
|---|---|
| Sun | ±0.01° |
| Moon | ±0.3° |
| Mars, Jupiter, Saturn | ±1–2° |
| Mercury, Venus | ±1–2° |
| Rahu / Ketu | ±0.5° |
| Ascendant (with known place) | ±0.5–1° |

This is sufficient for sign, house, and nakshatra determination. For precision work (exact degree analysis, rectification), use a Swiss Ephemeris-based tool.

When birth time is unknown, noon is used and the ascendant and house placements will be inaccurate. Planetary signs will still be correct for slow-moving planets; for the Moon, use with caution since it moves ~13° per day.

---

## Gemini Free Tier

The **Ask Chart** AI tab uses Gemini 2.5 Flash on Google's free tier:

- 1,500 requests per day
- No credit card required
- Trade-off: on the free tier, Google may use prompts for model improvement

For higher usage or to opt out of training data, upgrade to the paid tier ($0.15 per million input tokens).

---

## Adding Cities

Edit `src/cities.js` — each entry follows this shape:

```javascript
{ name: 'Surat', lat: 21.1702, lon: 72.8311, tz: 5.5 }
```

`tz` is the UTC offset in hours (standard time, not DST).

---

## License

MIT — free to use, modify, and deploy.
