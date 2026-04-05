const milestones = [
  {
    title: "Questionnaire Design",
    project: "questionnAIre",
    description:
      "AI-assisted questionnaire design tool for building clearer survey instruments",
    link: "https://questionn-ai-re.vercel.app/",
    github: "https://github.com/giobuzala/questionnAIre",
  },
  {
    title: "Sample Design",
    project: "Honeycomb Studio",
    description:
      "Interactive survey sample design tool for streamlining sample planning and study design",
    link: "https://honeycomb.streamlit.app/",
    github: "https://github.com/giobuzala/honeycomb-studio",
  },
  {
    title: "Data Collection",
  },
  {
    title: "Data Processing",
    project: "surveyorso",
    description: "R package providing a unified toolkit for end-to-end survey research workflows",
    link: "https://giobuzala.github.io/surveyorso/",
    github: "https://github.com/giobuzala/surveyorso",
  },
  {
    title: "Weighting",
  },
  {
    title: "Text Analysis",
    project: "forage",
    description: "AI-assisted open-ended coding agent for open-ended survey responses",
    link: "https://giobuzala.shinyapps.io/forage/",
    github: "https://github.com/giobuzala/forage",
  },
  {
    title: "Political Analytics",
    project: "pollar",
    description:
      "Interactive web app that generates Canadian federal election seat projections from polling data",
    link: "https://pollar-canada.vercel.app/",
    github: "https://github.com/giobuzala/pollar",
  },
  {
    title: "Advanced Analytics",
  },
  {
    title: "Data Visualization",
    subprojects: [
      {
        project: "Color Den",
        description:
          "Fork of a chroma.js-based palette tool, extended with an AI chat assistant to guide palette selection",
        link: "https://colorden.vercel.app/",
        github: "https://github.com/giobuzala/color-den",
      },
      {
        project: "Data Visualization Library",
        description:
          "A library of custom Excel charts for building advanced visualizations",
        dropbox: "https://www.dropbox.com/scl/fi/c1iho9v29jm744byxom2q/Data-Visualization-Library.pptx?rlkey=dcxbf9gpyk6snxcnkfk4uef94&dl=0",
      },
    ],
  },
];

const timeline = document.querySelector("#timeline");
const themeToggle = document.querySelector("#theme-toggle");
const yearEl = document.querySelector("#current-year");
const themeColorMeta = document.querySelector('meta[name="theme-color"]');
const STORAGE_KEY = "giobuzala-theme";

function buildIconLinks(item) {
  const icons = [];
  if (item.link) {
    icons.push(
      `<a class="card-icon-link" href="${item.link}" target="_blank" rel="noreferrer" aria-label="Visit ${item.project || item.title}" data-tooltip="Visit site">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </a>`
    );
  }
  if (item.github) {
    icons.push(
      `<a class="card-icon-link" href="${item.github}" target="_blank" rel="noreferrer" aria-label="GitHub repo" data-tooltip="GitHub repo">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.11.82-.26.82-.58l-.01-2.05c-3.34.73-4.04-1.61-4.04-1.61a3.18 3.18 0 0 0-1.34-1.76c-1.09-.74.08-.73.08-.73a2.52 2.52 0 0 1 1.84 1.24 2.56 2.56 0 0 0 3.5 1 2.56 2.56 0 0 1 .76-1.61c-2.67-.3-5.47-1.33-5.47-5.93a4.64 4.64 0 0 1 1.24-3.22 4.3 4.3 0 0 1 .12-3.18s1-.33 3.3 1.23a11.38 11.38 0 0 1 6 0c2.28-1.56 3.29-1.23 3.29-1.23a4.3 4.3 0 0 1 .12 3.18 4.64 4.64 0 0 1 1.23 3.22c0 4.61-2.81 5.63-5.48 5.92a2.87 2.87 0 0 1 .82 2.23l-.01 3.3c0 .32.22.7.83.58A12 12 0 0 0 12 .3"/></svg>
      </a>`
    );
  }
  if (item.dropbox) {
    icons.push(
      `<a class="card-icon-link" href="${item.dropbox}" target="_blank" rel="noreferrer" aria-label="Dropbox" data-tooltip="Dropbox">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6.977 2L0 6.2l4.99 3.978L12 6.2 6.977 2zm10.046 0L12 6.2l7.01 3.978L24 6.2 17.023 2zM0 14.156l6.977 4.2L12 14.378l-7.01-3.978L0 14.156zm17.023 4.2L24 14.156l-4.99-3.756L12 14.378l5.023 3.978zM12 15.3l-5.023 3.978L4.99 17.89v1.456L12 23.4l7.01-4.054V17.89L17.023 19.278 12 15.3z"/></svg>
      </a>`
    );
  }
  return icons.length ? `<div class="card-icon-links">${icons.join("")}</div>` : "";
}

function renderSubproject(sub) {
  return `
    <div class="card-subproject">
      <span class="card-project">${sub.project}</span>
      ${sub.description ? `<p class="card-desc">${sub.description}</p>` : ""}
      ${buildIconLinks(sub)}
    </div>
  `;
}

function renderTimeline() {
  timeline.innerHTML = milestones
    .map((milestone, index) => {
      const { title, project, description, subprojects } = milestone;
      const hasProject = Boolean(project || subprojects);
      const step = String(index + 1).padStart(2, "0");

      let body = "";
      if (subprojects) {
        body = `<div class="card-subprojects">${subprojects.map(renderSubproject).join("")}</div>`;
      } else {
        body = `
          ${project ? `<span class="card-project">${project}</span>` : ""}
          ${description ? `<p class="card-desc">${description}</p>` : ""}
          ${buildIconLinks(milestone)}
        `;
      }

      return `
        <li class="timeline-item${hasProject ? " has-project" : ""}">
          <div class="card${hasProject ? "" : " card-empty"}">
            ${hasProject ? '<div class="exp-card-glow"></div>' : ""}
            <span class="card-step">${step}</span>
            <h3>${title}</h3>
            ${body}
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

function initCardGlow() {
  const elements = document.querySelectorAll(
    ".exp-card, .card:not(.card-empty), .skills-row span"
  );

  elements.forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--glow-x", x + "%");
      el.style.setProperty("--glow-y", y + "%");
    });
  });
}

function initTabs() {
  const tabs = document.querySelectorAll(".tab");
  const panels = document.querySelectorAll(".tab-panel");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      panels.forEach((p) => {
        p.classList.remove("active");
        p.hidden = true;
      });

      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      const panel = document.getElementById(tab.getAttribute("aria-controls"));
      panel.classList.add("active");
      panel.hidden = false;
    });
  });
}

function initHeaderScroll() {
  const header = document.querySelector(".header");
  let ticking = false;

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        header.classList.toggle("scrolled", window.scrollY > 30);
        ticking = false;
      });
      ticking = true;
    }
  });
}

function initActiveNav() {
  const navLinks = document.querySelectorAll(".nav a[href^='#']");
  const sections = Array.from(navLinks)
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  function setActive() {
    const scrollY = window.scrollY;
    const atBottom =
      window.innerHeight + scrollY >= document.documentElement.scrollHeight - 2;

    if (atBottom) {
      navLinks.forEach((link) => link.classList.remove("active"));
      navLinks[navLinks.length - 1].classList.add("active");
      return;
    }

    let current = sections[0];
    for (const section of sections) {
      if (section.offsetTop - 150 <= scrollY) {
        current = section;
      }
    }

    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${current.id}`
      );
    });
  }

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        setActive();
        ticking = false;
      });
      ticking = true;
    }
  });

  setActive();
}

function initSmoothNav() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    });
  });
}

renderTimeline();
applyTheme(getInitialTheme());
initTabs();
initHeaderScroll();
initActiveNav();
initSmoothNav();

themeToggle.addEventListener("click", () => {
  const nextTheme =
    document.documentElement.dataset.theme === "dark" ? "light" : "dark";

  localStorage.setItem(STORAGE_KEY, nextTheme);
  applyTheme(nextTheme);
});

yearEl.textContent = new Date().getFullYear();

initCardGlow();
