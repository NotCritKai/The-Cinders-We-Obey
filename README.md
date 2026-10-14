# The Cinders We Obey

A static companion website built with plain HTML, CSS, and JavaScript. No runtime dependencies or build step are required.

## Local preview

From this folder, run:

```sh
python3 -m http.server 8001
```

Open http://localhost:8001. Stop the server with Ctrl+C.

## Where to edit

- `index.html`: table-of-contents homepage, without navigation tabs.
- `reading/index.html`: chapter content; currently empty.
- `characters/index.html`: chapter selector and all seven character profiles.
- `world/index.html`: setting and worldbuilding notes.
- `powers/index.html`: Resonance Atlas page structure.
- `glossary/index.html`: searchable terms and definitions.
- `style.css`: shared styling, responsive layouts, and Atlas styling. The theme colors are at the top. Rule order matters where later rules override earlier ones.
- `site.js`: mobile menu, glossary filtering, and character selection, each in its own initializer.
- `chart.js`: power data, matchup explanations, SVG rendering, and Atlas events. Each power row contains its name, category, abilities, and limitations. Each matchup row contains two power indices and an explanation; update those indices if you reorder powers.
- `assets/`: character portraits.

## Content editing

Character selector values match either a profile's `data-character` or its `data-chapter`. Keep these attributes and option values synchronized when adding profiles or chapters.

Each glossary entry uses a `data-term` wrapper. Update the initial term count in the HTML when adding or removing entries; JavaScript recalculates it during searches.

Navigation is repeated in each inner page so the site works without a build step. Update each page when changing navigation. Links are relative to support hosting under a repository path.

## Formatting and checks

Use two-space indentation. To format all source files with Prettier:

```sh
npx prettier@3.6.2 --write '**/*.html' '*.css' '*.js' README.md
```

To check JavaScript syntax:

```sh
node --check site.js
node --check chart.js
```

Publish the whole folder as one static site when ready. Deployment has not been confirmed.
