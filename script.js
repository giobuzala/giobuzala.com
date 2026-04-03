const milestones = [
  {
    title: "Questionnaire design",
    project: "questionnAIre",
    description:
      "AI-assisted questionnaire design tool for building clearer survey instruments.",
  },
  {
    title: "Sample design",
    project: "Honeycomb Studio",
    description:
      "Interactive sampling tool for structuring respondent coverage and study design.",
  },
  {
    title: "Data collection",
  },
  {
    title: "Data processing",
    project: "surveyorso",
    description: "R package for survey research and analytics.",
    github: "https://github.com/giobuzala/surveyorso",
  },
  {
    title: "Weighting",
  },
  {
    title: "Text analysis",
    project: "forage",
    description: "AI-assisted open-ended coding agent for survey verbatims.",
    github: "https://github.com/giobuzala/forage",
  },
  {
    title: "Political analytics",
    project: "pollar",
    description:
      "Tools for public opinion measurement and political survey analysis.",
  },
  {
    title: "Advanced analytics",
  },
  {
    title: "Data visualization",
    project: "Color Den / Data Visualization Library",
    description:
      "Color palettes and charting utilities for analytical reporting.",
  },
];

const timeline = document.querySelector("#timeline");
const themeToggle = document.querySelector("#theme-toggle");
const yearEl = document.querySelector("#current-year");
const themeColorMeta = document.querySelector('meta[name="theme-color"]');
const STORAGE_KEY = "giobuzala-theme";

function renderTimeline() {
  timeline.innerHTML = milestones
    .map((milestone, index) => {
      const { title, project, description, github } = milestone;
      const hasProject = Boolean(project);
      const step = String(index + 1).padStart(2, "0");

      const links = [];
      if (github) {
        links.push(
          `<a href="${github}" target="_blank" rel="noreferrer">GitHub</a>`
        );
      }

      return `
        <li class="timeline-item${hasProject ? " has-project" : ""}">
          <div class="card${hasProject ? "" : " card-empty"}">
            <span class="card-step">${step}</span>
            <h3>${title}</h3>
            ${hasProject ? `<span class="card-project">${project}</span>` : ""}
            ${description ? `<p class="card-desc">${description}</p>` : ""}
            ${links.length ? `<div class="card-links">${links.join("")}</div>` : ""}
          </div>
        </li>
      `;
    })
    .join("");
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const color = theme === "dark" ? "#0d1117" : "#fafafa";
  themeColorMeta.setAttribute("content", color);
  themeToggle.setAttribute(
    "aria-label",
    theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
  );
}

function getInitialTheme() {
  return localStorage.getItem(STORAGE_KEY) || "light";
}

renderTimeline();
applyTheme(getInitialTheme());

themeToggle.addEventListener("click", () => {
  const nextTheme =
    document.documentElement.dataset.theme === "dark" ? "light" : "dark";

  localStorage.setItem(STORAGE_KEY, nextTheme);
  applyTheme(nextTheme);
});

yearEl.textContent = new Date().getFullYear();
