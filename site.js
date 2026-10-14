// Shared interactions. Each initializer runs only on pages with its controls.
initializeNavigation();
initializeGlossarySearch();
initializeCharacterPicker();

function initializeNavigation() {
  const menuButton = document.querySelector(".menu-toggle");
  const navigationLinks = document.querySelector("#site-links");
  if (!menuButton || !navigationLinks) return;

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(isOpen));
    navigationLinks.classList.toggle("open", isOpen);
  });
}

function initializeGlossarySearch() {
  const searchInput = document.querySelector("#term-search");
  if (!searchInput) return;

  const terms = document.querySelectorAll("[data-term]");
  const termCount = document.querySelector("#term-count");
  const emptyMessage = document.querySelector("#no-terms");

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    let matchingCount = 0;

    terms.forEach((term) => {
      const matchesQuery = term.textContent.toLowerCase().includes(query);
      term.hidden = !matchesQuery;
      if (matchesQuery) matchingCount++;
    });

    termCount.textContent = `${matchingCount} ${matchingCount === 1 ? "term" : "terms"}`;
    emptyMessage.hidden = matchingCount !== 0;
  });
}

function initializeCharacterPicker() {
  const characterSelect = document.querySelector("#character-select");
  if (!characterSelect) return;

  const profiles = document.querySelectorAll("[data-character]");

  function showSelectedProfiles() {
    const selectedValue = characterSelect.value;
    // A chapter option shows every profile assigned to that chapter.
    profiles.forEach((profile) => {
      profile.hidden =
        selectedValue !== profile.dataset.character &&
        selectedValue !== profile.dataset.chapter;
    });
  }

  characterSelect.addEventListener("change", showSelectedProfiles);
  showSelectedProfiles();
}
