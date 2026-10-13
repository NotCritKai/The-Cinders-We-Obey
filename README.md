# The Cinders We Obey

One static fantasy-book website, with six pages:

- `/` — table-of-contents homepage (no navigation tabs).
- `/characters/` — Retton, Gray and Varen.
- `/powers/` — interactive Resonance Atlas.
- `/reading/` — chapter area, currently empty.
- `/world/` — setting and worldbuilding overview.
- `/glossary/` — searchable names and terms.

No dependencies or build step. Run `python3 -m http.server 8000` from this folder and open http://localhost:8000.

All navigation uses relative links so the site also works under a GitHub Pages repository path. Publish this folder as a single site when ready.

Edit `chart.js` for powers and matchups, `style.css` for shared appearance, and each page’s `index.html` for its content. Portraits live in `assets/`.
