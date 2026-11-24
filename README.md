# KODYRA — Software & Data Studio

The public-facing **KODYRA agency website**. Modern Startup branding, English/French copy, a live flagship application, two browser-only interactive engineering demonstrations, transparent technical references, and a project-inquiry flow.

## What is real

- **KODYRA FleetOps:** functional demonstration hosted at `https://kodyra-fleetops-live.elghoualizakariae.workers.dev/`. Source: `https://github.com/Elghouali/kodyra-fleetops`. Uses fictional data and browser-local state. It is not a production multiuser rental system or a commissioned project.
- **Data quality mini-lab:** CSV parser handles quoted/multiline fields, rejects inconsistent structure, detects exact duplicates, measures missing values, and exports neutralized CSV.
- **Booking quote mini-lab:** deterministic vehicle rate calculation with date validation; no transactions or real bookings.
- **Source case studies:** visible engineering reference repos with status limitations stated, not fabricated customer projects.
- **Project inquiry:** service, budget, timing and problem description; the form opens the visitor's email app using `mailto:`. The website **does not collect or transmit lead forms server-side**, and opening an email draft does not guarantee delivery.

## Tech & hosting

- Static HTML/CSS/vanilla ES modules. Zero runtime dependencies or trackers.
- `npm run check`, `npm test`, `npm run build` (Node >=20).
- `npm run build` copies static files to `dist/` for Cloudflare Pages or Workers Static Assets.
- `.github/workflows/ci.yml` checks source, tests, and build on push and pull request.

## Automatic publishing

Pushes to `main` run tests and build the site, then publish the generated assets to the `gh-pages` branch using `.github/workflows/pages.yml`. The repository owner must enable **Settings → Pages → Deploy from a branch → gh-pages / (root)** once. After GitHub reports publication, the URL will normally be `https://elghouali.github.io/kodyra-website/`.

The current Cloudflare Worker is a **separate deployment** and does not automatically receive GitHub updates. See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Local preview

```bash
npm run check
npm test
npm run build
python3 -m http.server 4173
```

Open <http://localhost:4173>. Use an HTTP server rather than opening `index.html` directly so ES module imports work.

## Cloudflare deployment

This site may be hosted on the free tier as a simple static application; no account billing, database, or paid domain is required for the demo. A Cloudflare Worker can serve its assets for immediate launch. The deployed Worker is a separate edge copy; until a GitHub CI deployment is configured, updating this repository does not automatically update the website.

## Privacy / security

- CSV files are processed locally in the user's browser; avoid using sensitive real customer data in a public demo.
- No network API calls in front-end JavaScript; no analytics or third-party font resources.
- CSP and browser security headers supplied in `_headers` for supporting hosts.
- The contact form uses a real email app (`mailto:`), not a fake "message sent" confirmation.
- Do not add fabricated testimonials, paid-client claims, certifications, or outcome metrics.

## Scope

KODYRA is a young independent studio. The portfolio presents founder-led technical reference projects; not all are commercial deliveries. Individual repository READMEs describe what has and has not been verified.
