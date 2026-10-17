# The Cinders We Obey

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Readers are the primary audience. They use the companion website to read the novel and explore its characters, setting, terminology, and resonance system. Spoilers must be clearly separated from reader-facing content.

The author also uses the project to develop and maintain story reference material. Author notes must not be presented as spoiler-safe reader content.

## Product Purpose

A companion website for the original industrial-fantasy novel The Cinders We Obey. It brings chapters and story reference material together so readers can understand and explore the story.

Success means readers can find chapters and relevant reference information without accidentally encountering future plot revelations.

## Operating Context

The novel is in development. Manuscript drafts, a Google Doc, website profiles, and chat revisions are separate sources and are not guaranteed to be synchronized. Inspect current sources before changing story facts. Future outline beats are not completed chapters.

Prose revisions should be supplied in chat unless the author explicitly requests a document edit. Website changes do not authorize edits to the manuscript or Google Doc.

## Capabilities and Constraints

- Plain HTML, CSS, and JavaScript with no runtime dependencies or build step. Preserve readable, editable source formatting.
- Six existing destinations: Home, Reading, Characters, World, Resonance Atlas, and Glossary.
- Home is a table of contents without navigation tabs. Inner-page navigation follows the destination order above, with a compact desktop layout and a mobile Menu.
- Reading currently has an empty chapter area. Do not publish chat drafts automatically.
- Characters supports chapter groups and individual profiles. Current profiles contain development notes and spoilers; separating them from reader content is a confirmed requirement, not an implemented feature.
- The Resonance Atlas offers interactive power selection and conditional matchup explanations. Matchups never imply automatic victories.
- The glossary supports text search and includes plot-sensitive material such as Concordance.
- Keep relative links so the site can work under a repository hosting path.
- Local preview: run `python3 -m http.server 8001` from the project root and open `http://localhost:8001/`.
- Deployment and the public hosting destination are unconfirmed.

## Brand Commitments

The title is The Cinders We Obey. Preserve the original story, character identities, and approved portraits, including Veyla's supplied design. Keep established facts distinct from provisional ideas and suggestions.

The story combines industrial fantasy, humor, creativity, ordinary affection, and a dark relationship arc involving control. Gray's sincere care does not excuse deception or coercion. Do not flatten the characters into their darkest traits or force a clean redemption.

## Evidence on Hand

- Existing page content in `index.html`, `reading/index.html`, `characters/index.html`, `world/index.html`, `powers/index.html`, and `glossary/index.html`.
- Approved character portraits in `assets/`: Retton, Gray, Tarin, Varen, Mara, Iven, and Veyla.
- Resonance abilities and conditional matchup data in `chart.js`.
- Implementation and editing instructions in `README.md`.
- The author has supplied manuscript drafts and a longer outline separately; neither should be assumed fully represented by website content.

## Product Principles

1. Put readers first and clearly separate spoilers from ordinary exploration.
2. Preserve the author's ownership of story decisions; identify uncertainty rather than inventing canon.
3. Keep reference material consistent while acknowledging that drafts and sources can differ.
4. Make the site easy to navigate and its source easy to edit without requiring a framework or build step.
5. Let the story and approved artwork lead; do not invent publication or deployment claims.

## Open Decisions

- The spoiler boundary: chapter-based reveal rules, a spoiler toggle, separate development pages, or another explicitly approved approach.
- Which development profiles and outline details should be published at all.
- When chapters should be added to the Reading page.
- Final hosting and deployment arrangements.
- Provisional story names, unresolved character details, and wider world history remain subject to the author's decisions.
