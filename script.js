// Sebastian Keltz Portfolio JavaScript
// Keep this file small for GitHub Pages. It controls the mobile menu,
// active navigation state, scroll reveal, current year, and image placeholders.

document.documentElement.classList.add("js-enabled");

const body = document.body;
const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navLinks = document.querySelector("[data-nav-links]");
const currentYear = document.querySelector("[data-current-year]");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  navLinks.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link) return;

    body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation menu");
  });
}

document.querySelectorAll(".nav-links a").forEach((link) => {
  const href = link.getAttribute("href");

  if (!href || href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto:")) return;

  try {
    const currentPath = window.location.pathname.replace(/\\/g, "/");
    const targetPath = new URL(href, window.location.href).pathname.replace(/\\/g, "/");
    const currentFile = currentPath.split("/").pop() || "index.html";
    const targetFile = targetPath.split("/").pop() || "index.html";
    const isProjectDetail = currentPath.includes("/projects/") && targetFile === "projects.html";
    const isCourseworkDetail = currentPath.includes("/coursework/") && targetFile === "academic.html";

    if (currentFile === targetFile || isProjectDetail || isCourseworkDetail) {
      link.classList.add("is-active");
    }
  } catch (error) {
    // If URL parsing is unavailable, the link still works without active styling.
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  body.classList.remove("nav-open");
  if (navToggle) {
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation menu");
  }
});

// PHOTO PLACEHOLDERS:
// Each .image-slot has an img pointing to assets/your-file.jpg.
// If the file exists, the real image fades in.
// If it does not exist yet, the slot stays as a clean placeholder with the filename.
document.querySelectorAll(".image-slot").forEach((slot) => {
  const image = slot.querySelector("img");

  if (!image) return;

  const markLoaded = () => {
    slot.classList.add("has-image");
    slot.classList.remove("missing-image");
  };

  const markMissing = () => {
    slot.classList.add("missing-image");
    slot.classList.remove("has-image");
    image.setAttribute("aria-hidden", "true");
  };

  if (image.complete) {
    if (image.naturalWidth > 0) {
      markLoaded();
    } else {
      markMissing();
    }
  }

  image.addEventListener("load", markLoaded);
  image.addEventListener("error", markMissing);
});

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const sections = document.querySelectorAll("main section[id]");
const navAnchors = document.querySelectorAll(".nav-links a[href^='#']");

if ("IntersectionObserver" in window && sections.length && navAnchors.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        navAnchors.forEach((link) => link.classList.remove("is-active"));

        if (activeLink) {
          activeLink.classList.add("is-active");
        }
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px",
      threshold: 0.01
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

window.addEventListener("resize", () => {
  if (!header || window.innerWidth <= 860) return;

  body.classList.remove("nav-open");
  if (navToggle) {
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation menu");
  }
});
