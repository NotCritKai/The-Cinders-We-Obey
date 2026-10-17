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

## Motion

`motion.css` contains the selected transitions.dev recipes and site-specific motion tokens. All pages load it after `style.css`. Tune durations and the short panel travel in its final `:root` block.

- Mobile navigation: dropdown open/close, with Escape dismissal and hidden links excluded from keyboard focus.
- Character selection and Atlas details: short panel reveal on selection changes, with no first-load entrance delay.
- Glossary: soft crossfade of the matching-term count; rapid typing cancels previous swaps.
- Contents links: small chevron response on hover.

`site.js` owns shared motion helpers and interaction cleanup. `chart.js` requests a detail reveal when the selected power changes and retains focus when rebuilding chart nodes. Reduced-motion preferences skip content reveals and text swaps and disable recipe transitions. Static content stays visible without JavaScript.

Motion recipes are from [transitions.dev](https://transitions.dev), used under its personal and commercial use license. No AI-generation runtime or framework dependency is installed.
