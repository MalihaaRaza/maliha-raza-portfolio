# CLAUDE.md

Static, no-build, no-framework developer portfolio ("build log" style). Plain HTML/CSS/vanilla JS — no bundler, no package.json, no dependencies.

## File structure

```
index.html        page structure & content (nav, hero, About, Build Log, Contact)
css/style.css      all styling: design tokens, layout, components
js/projects.js     project data — edit this to add/update projects
js/script.js       renders + filters the project log from projects.js (rarely touched)
README.md          human-facing setup/deploy instructions
```

`index.html` loads `js/projects.js` before `js/script.js` (order matters — `script.js` reads the global `projects` array). Both are plain `<script>` tags at the end of `<body>`, no modules, no bundler.

## Adding a project

Edit `js/projects.js` and add an object to the `projects` array:

```js
{
  id: 3,
  title: "Project name",
  category: "web", // must be exactly "web" or "ai-ml"
  date: "2026-07", // YYYY-MM, used to sort the log newest-first
  summary: "One or two sentences: what it does, who it's for, the problem it solves.",
  tech: ["React", "Node.js"],
  liveUrl: "",   // link to live demo, or leave blank
  githubUrl: "", // link to repo, or leave blank
  featured: true
}
```

The log re-sorts and re-renders automatically — no HTML editing needed. `featured` is declared but not currently read anywhere in `script.js`/`style.css`.

### Adding a new category
1. Use the new category string in `js/projects.js`.
2. Add a matching filter button in `#filter-row` in `index.html`.
3. Add a color rule in `css/style.css` following the existing pattern:
   ```css
   .log-card[data-category="ai-ml"] { border-left-color: var(--pink); }
   ```
4. Update `categoryLabel()` in `js/script.js` (currently a binary web/ai-ml check, not a lookup table).

## Adding a section

`index.html` marks copyable section blocks with banner comments (see above `#about` and `#contact`). To add a new section:
1. Copy an entire `<section class="section" id="...">...</section>` block.
2. Change the `id`.
3. Bump the `§ 0N` index label in `.section-head`.
4. Add a corresponding link in `.nav-links`.

Shared `.section` / `.section-head` CSS handles spacing and heading style automatically — no new CSS required for a structurally standard section.

## Design tokens (`css/style.css` `:root`)

```css
--ink: #14121F;      /* body text */
--bg: #FAF8FF;        /* page background */
--surface: #FFFFFF;   /* card background */
--muted: #6B6880;     /* secondary text */
--line: #E7E3F5;      /* borders */

--blue: #3D5AFE;      /* web / software category */
--pink: #FF3E9A;      /* ai / ml category */
--yellow: #FFD23F;    /* CTA / highlight */
--violet: #6C63FF;    /* gradient support */

--display: "Space Grotesk", sans-serif; /* headings */
--body: "Inter", sans-serif;             /* body text */
--mono: "JetBrains Mono", monospace;     /* log/tech labels */

--max: 1080px;  /* content max-width */
--radius: 14px; /* corner radius */
```

Fonts load via Google Fonts `<link>` in `<head>`. Single responsive breakpoint at `760px`. Do not change these tokens or the visual design without explicit confirmation.
