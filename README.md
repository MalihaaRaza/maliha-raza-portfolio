# Your Portfolio Site

A static portfolio/build-log site. No build step, no framework — just HTML, CSS, and vanilla JS, so it's easy to keep editing yourself.

## File map

```
index.html        → page structure & content (About, Contact, etc.)
css/style.css      → all styling, colors, fonts
js/projects.js     → YOUR PROJECTS — edit this file to add a project
js/script.js       → renders + filters the project log (rarely touch this)
```

## Adding a new project

Open `js/projects.js`. Copy one entry, paste it above the closing `]`, edit the fields:

```js
{
  id: 3,
  title: "Your project name",
  category: "web", // "web" or "ai-ml"
  date: "2026-07",
  summary: "One or two sentences on what it does.",
  tech: ["React", "Express"],
  liveUrl: "https://your-live-demo.com",
  githubUrl: "https://github.com/you/repo",
  featured: false
}
```

Save the file, refresh the page (or push to GitHub) — it appears in the log automatically, sorted newest first, filterable by category.

## Adding a new category later (e.g. beyond web / ai-ml)

1. In `js/projects.js`, use the new category string in a project's `category` field.
2. In `index.html`, add a matching filter button in the `#filter-row` div:
   `<button class="filter-btn" data-filter="your-category">Your Label</button>`
3. In `css/style.css`, add a color rule for it, following the pattern of:
   `.log-card[data-category="ai-ml"] { border-left-color: var(--pink); }`

## Adding a whole new section (e.g. Testimonials, Resume, Blog)

Copy the entire `<section class="section" id="...">...</section>` block for "Contact" in `index.html`, paste it where you want the new section, then:
- Change the `id` to something unique (e.g. `id="testimonials"`)
- Change the `§ 03` index label to the next number
- Add a link to it in the nav (`<ul class="nav-links">`)
- Replace the inner content

The section styling (spacing, heading style, divider line) is handled automatically by the `.section` and `.section-head` classes.

## Editing your info

- **Name / title / bio**: edit the hero text and `#about` section directly in `index.html`.
- **Skills pills**: edit the `.pill` spans inside `#about`.
- **Contact links**: edit the `mailto:`, LinkedIn, and GitHub links in `#contact`.
- **Colors**: all colors are CSS variables at the top of `css/style.css` (`:root { ... }`) — change one line to restyle the whole site.

## Previewing locally

Open `index.html` directly in a browser, or run a tiny local server from this folder:

```bash
python3 -m http.server 8080
```

then visit `http://localhost:8080`.

## Deploying to GitHub Pages (free)

This repo is already pushed to `github.com/MalihaaRaza/maliha-raza-portfolio` on the `master` branch, so hosting it just takes a settings change:

1. On GitHub, go to the repo → **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Branch: **`master`**, folder: **`/ (root)`** → **Save**.
4. The site goes live at `https://malihaaraza.github.io/maliha-raza-portfolio/`, usually within a minute or two.
5. From then on: adding a project is `edit js/projects.js → git add . → git commit -m "add project" → git push` — the live site updates automatically.

## Posting to LinkedIn

Once live, share the URL directly — it works well as a link in your profile's "Featured" section or as a standalone post announcing a new project (just re-share the same link each time; the log will show whatever's newest).
