// Renders projects from projects.js into the #log container,
// newest first, and wires up the category filter buttons.
// You should not need to edit this file to add a project —
// edit js/projects.js instead.

(function () {
  const logEl = document.getElementById("log");
  const filterRow = document.getElementById("filter-row");

  function categoryLabel(cat) {
    return cat === "ai-ml" ? "AI / ML" : "Web / Software";
  }

  function formatId(id) {
    return "LOG " + String(id).padStart(3, "0");
  }

  function renderCard(project, index) {
    const links = [];
    if (project.liveUrl) links.push(`<a href="${project.liveUrl}" target="_blank" rel="noopener">Live</a>`);
    if (project.githubUrl) links.push(`<a href="${project.githubUrl}" target="_blank" rel="noopener">Code</a>`);

    const tags = (project.tech || []).map(t => `<span class="tag">${t}</span>`).join("");

    return `
      <article class="log-card" data-category="${project.category}" style="animation-delay:${index * 0.06}s">
        <div class="log-meta">
          <span class="log-id">${formatId(project.id)}</span>
          <span>${project.date || ""}</span>
        </div>
        <div class="log-body">
          <span class="category-badge">${categoryLabel(project.category)}</span>
          <h3>${project.title}</h3>
          <p>${project.summary}</p>
          <div class="tag-row">${tags}</div>
          <div class="log-links">${links.join("")}</div>
        </div>
      </article>
    `;
  }

  function render(filter) {
    if (!Array.isArray(projects) || projects.length === 0) {
      logEl.innerHTML = `<div class="empty-state">No projects logged yet. Add one in js/projects.js.</div>`;
      return;
    }

    const sorted = [...projects].sort((a, b) => (b.date || "").localeCompare(a.date || "") || b.id - a.id);
    const filtered = filter === "all" ? sorted : sorted.filter(p => p.category === filter);

    if (filtered.length === 0) {
      logEl.innerHTML = `<div class="empty-state">Nothing in this category yet.</div>`;
      return;
    }

    logEl.innerHTML = filtered.map(renderCard).join("");
  }

  filterRow.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    filterRow.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    render(btn.dataset.filter);
  });

  render("all");
})();
