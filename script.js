/** Set to `true` to show only the under-construction screen; `false` runs the full site. */
const SITE_UNDER_CONSTRUCTION = false;

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
    title: "Political Analysis",
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
          "Fork of a chroma.js-based color palette tool, extended with an AI chat assistant to guide palette selection",
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
        <svg width="16" height="16" aria-hidden="true" focusable="false"><use href="#icon-external" /></svg>
      </a>`
    );
  }
  if (item.github) {
    icons.push(
      `<a class="card-icon-link" href="${item.github}" target="_blank" rel="noreferrer" aria-label="GitHub repo" data-tooltip="GitHub repo">
        <svg width="16" height="16" aria-hidden="true" focusable="false"><use href="#icon-github" /></svg>
      </a>`
    );
  }
  if (item.dropbox) {
    icons.push(
      `<a class="card-icon-link" href="${item.dropbox}" target="_blank" rel="noreferrer" aria-label="Dropbox" data-tooltip="Dropbox">
        <svg width="16" height="16" aria-hidden="true" focusable="false"><use href="#icon-dropbox" /></svg>
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

      const body = subprojects
        ? `<div class="card-subprojects">${subprojects.map(renderSubproject).join("")}</div>`
        : `
          ${project ? `<span class="card-project">${project}</span>` : ""}
          ${description ? `<p class="card-desc">${description}</p>` : ""}
          ${buildIconLinks(milestone)}
        `;

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

function setGlowPosition(el, clientX, clientY) {
  const rect = el.getBoundingClientRect();
  const x = ((clientX - rect.left) / rect.width) * 100;
  const y = ((clientY - rect.top) / rect.height) * 100;
  el.style.setProperty("--glow-x", x + "%");
  el.style.setProperty("--glow-y", y + "%");
}

function initCardGlow() {
  const elements = document.querySelectorAll(
    ".exp-card, .card:not(.card-empty), .skills-row span"
  );

  elements.forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      setGlowPosition(el, e.clientX, e.clientY);
    });

    el.addEventListener("pointerdown", (e) => {
      setGlowPosition(el, e.clientX, e.clientY);
      if (e.pointerType !== "mouse") {
        el.classList.add("glow-pointer-active");
        try {
          el.setPointerCapture(e.pointerId);
        } catch {
        }
      }
    });

    function endPointerGlow(e) {
      if (e.pointerType === "mouse") return;
      el.classList.remove("glow-pointer-active");
      if (el.hasPointerCapture?.(e.pointerId)) {
        el.releasePointerCapture(e.pointerId);
      }
    }

    el.addEventListener("pointerup", endPointerGlow);
    el.addEventListener("pointercancel", endPointerGlow);
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
      if (!panel) return;
      panel.classList.add("active");
      panel.hidden = false;
    });
  });
}

function onScrollRaf(callback) {
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      callback();
      ticking = false;
    });
  });
}

function initHeaderScroll() {
  const header = document.querySelector(".header");
  const SCROLL_COMPACT_ENTER = 48;
  const SCROLL_COMPACT_EXIT = 20;
  let compact = window.scrollY > SCROLL_COMPACT_ENTER;
  if (compact) header.classList.add("scrolled");

  onScrollRaf(() => {
    const y = window.scrollY;
    if (!compact && y > SCROLL_COMPACT_ENTER) {
      compact = true;
      header.classList.add("scrolled");
    } else if (compact && y < SCROLL_COMPACT_EXIT) {
      compact = false;
      header.classList.remove("scrolled");
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

  onScrollRaf(setActive);
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

function bootstrap() {
  applyTheme(getInitialTheme());

  if (SITE_UNDER_CONSTRUCTION) {
    document.body.classList.add("site-under-construction");
    const gate = document.getElementById("construction-screen");
    if (gate) {
      gate.removeAttribute("hidden");
      gate.setAttribute("aria-hidden", "false");
    }
    document.title = "Under construction";
    return;
  }

  renderTimeline();
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
}

bootstrap();
