# Craftsmen — Static HTML/CSS/JS

Plain HTML/CSS/JavaScript version of the project. No build step required.

## Files
- `index.html` — Home (hero + categories) → `main.js`
- `craftsmen.html` — Directory of artisans → `craftsmen.js`
- `profile.html` — Profile page (Portfolio / Reviews / About tabs) → `profile.js`
- `data.js` — Shared craftsmen data + helpers (stars, query param)
- `styles.css` — All site styles (design system: navy + orange)
- `main.js` / `craftsmen.js` / `profile.js` — Per-page logic

## Run locally
Just open `index.html` in a browser, or serve the folder:

```bash
npx serve .
# or
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Navigation
- Home → "Browse Craftsmen" → `craftsmen.html`
- Directory → "View Profile" → `profile.html?id=<craftsman-id>`
