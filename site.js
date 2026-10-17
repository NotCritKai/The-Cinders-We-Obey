// Shared interactions. Each initializer runs only on pages with its controls.
initializeNavigation();
initializeGlossarySearch();
initializeCharacterPicker();

function initializeNavigation() {
  const menuButton = document.querySelector(".menu-toggle");
  const navigationLinks = document.querySelector("#site-links");
  if (!menuButton || !navigationLinks) return;

  const mobileQuery = window.matchMedia("(max-width: 760px)");
  let closeTimer;
  navigationLinks.classList.add("t-dropdown");
  navigationLinks.dataset.origin = "top-right";

  function setMenuOpen(isOpen) {
    clearTimeout(closeTimer);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    navigationLinks.inert = mobileQuery.matches && !isOpen;
    navigationLinks.classList.remove("is-closing");
    if (isOpen) {
      navigationLinks.classList.add("open");
      void navigationLinks.offsetWidth;
      navigationLinks.classList.add("is-open");
    } else {
      navigationLinks.classList.remove("is-open");
      if (mobileQuery.matches && !prefersReducedMotion()) {
        navigationLinks.classList.add("is-closing");
        closeTimer = setTimeout(() => {
          navigationLinks.classList.remove("open", "is-closing");
        }, motionMilliseconds("--dropdown-close-dur"));
      } else {
        navigationLinks.classList.remove("open");
      }
    }
  }

  menuButton.addEventListener("click", () => {
    setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
  });
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      menuButton.getAttribute("aria-expanded") === "true"
    ) {
      setMenuOpen(false);
      menuButton.focus();
    }
  });
  mobileQuery.addEventListener("change", () => {
    if (mobileQuery.matches && navigationLinks.contains(document.activeElement))
      menuButton.focus();
    setMenuOpen(false);
  });
  setMenuOpen(false);
}

function initializeGlossarySearch() {
  const searchInput = document.querySelector("#term-search");
  if (!searchInput) return;

  const terms = document.querySelectorAll("[data-term]");
  const termCount = document.querySelector("#term-count");
  termCount.classList.add("t-text-soft");
  const emptyMessage = document.querySelector("#no-terms");

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    let matchingCount = 0;

    terms.forEach((term) => {
      const matchesQuery = term.textContent.toLowerCase().includes(query);
      term.hidden = !matchesQuery;
      if (matchesQuery) matchingCount++;
    });

    softSwap(
      termCount,
      `${matchingCount} ${matchingCount === 1 ? "term" : "terms"}`,
    );
    emptyMessage.hidden = matchingCount !== 0;
  });
}

function initializeCharacterPicker() {
  const characterSelect = document.querySelector("#character-select");
  if (!characterSelect) return;

  const profiles = document.querySelectorAll("[data-character]");

  function showSelectedProfiles(event) {
    const selectedValue = characterSelect.value;
    // A chapter option shows every profile assigned to that chapter.
    profiles.forEach((profile) => {
      const wasHidden = profile.hidden;
      profile.hidden =
        selectedValue !== profile.dataset.character &&
        selectedValue !== profile.dataset.chapter;
      if (event && wasHidden && !profile.hidden) revealPanel(profile);
    });
  }

  characterSelect.addEventListener("change", showSelectedProfiles);
  showSelectedProfiles();
}

// Read duration tokens once per interaction so CSS remains the timing authority.
function motionMilliseconds(name) {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return parseFloat(value) * (value.endsWith("ms") ? 1 : 1000) || 0;
}
function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Reveal only newly selected content; first-load reading stays immediately visible.
function revealPanel(element) {
  if (prefersReducedMotion()) return;
  clearTimeout(element._panelTimer);
  element.classList.add("t-panel-slide");
  element.dataset.open = "false";
  void element.offsetWidth;
  element.dataset.open = "true";
  element._panelTimer = setTimeout(() => {
    element.classList.remove("t-panel-slide");
    delete element.dataset.open;
  }, motionMilliseconds("--panel-open-dur"));
}

// Soft swap: the old text blurs out while the new text blurs in, at the
// same time and in the same spot, and the width eases so the elements
// beside it glide to their new place.
const ms = (name) =>
  parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue(name),
  ) || 0;

function softSwap(el, next) {
  if (prefersReducedMotion()) {
    clearTimeout(el._softTimer);
    el.classList.remove("is-swapping");
    el.style.removeProperty("width");
    el.dataset.text = next;
    el.textContent = next;
    return;
  }
  const prev = el.dataset.text ?? el.textContent;
  if (prev === next) return;
  el.dataset.text = next;
  clearTimeout(el._softTimer);

  const out = document.createElement("span");
  out.className = "t-text-soft-old";
  out.setAttribute("aria-hidden", "true");
  out.textContent = prev;
  const inn = document.createElement("span");
  inn.className = "t-text-soft-new";
  inn.textContent = next;

  const w0 = el.getBoundingClientRect().width;
  el.classList.remove("is-swapping");
  el.replaceChildren(out, inn);
  const w1 = inn.getBoundingClientRect().width;
  el.style.width = w0 + "px";
  void el.offsetWidth; // force reflow so every transition runs
  el.classList.add("is-swapping");
  el.style.width = w1 + "px";

  el._softTimer = setTimeout(
    () => {
      el.classList.remove("is-swapping");
      el.style.removeProperty("width");
      el.textContent = next;
    },
    Math.max(ms("--text-soft-dur"), ms("--text-soft-resize-dur")) + 40,
  );
}
