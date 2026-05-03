/* ═══════════════════════════════════════════════════════════ */
/* SSIA VANGUARD CHRONICLES - CHARACTER SYSTEM V2.1          */
/* ═══════════════════════════════════════════════════════════ */

/* ────────────────────────────────────────────────────────── */
/* ELEMENTAL HELPER                                           */
/* ────────────────────────────────────────────────────────── */

/**
 * Automatically returns the emoji associated with an element name.
 * @param {string} element - The element name (e.g., "Pyro", "Electro")
 * @returns {string} - Emoji + Space + Name
 */
function getElementIcon(element) {
  const icons = {
    "Pyro": "🔥",
    "Electro": "⚡",
    "Cryo": "❄️",
    "Hydro": "💧",
    "Aero": "🍃",
    "Geo": "🪨",
    "Dendro": "🌿",
    "Physical": "⚔️",
    "Void": "🌌",
    "Spectro": "🔆"
  };
  return icons[element] ? `${icons[element]} ${element}` : element;
}

/* ────────────────────────────────────────────────────────── */
/* CHARACTER DATA                                            */
/* ────────────────────────────────────────────────────────── */

/* TEMPLATE FOR NEW CHARACTERS:
  ---------------------------
  {
    id: "unique-slug",
    name: "Full Name",
    rarity: 5,
    role: "Main DPS / Support / Healer",
    faction: "SSIA",
    element: "Pyro", // Just text: Pyro, Electro, Cryo, Hydro, Anemo, Geo, Dendro
    weapon: "Weapon Type",
    portrait: "URL",
    splash: "URL",
    tags: ["Tag1", "Tag2"],
    bio: "Character description here."
  },
*/

const charactersData = [
  {
    id: "jones-harrison",
    name: "Jones Harrison",
    rarity: 5,
    role: "Main DPS",
    faction: "SSIA",
    element: "Pyro",
    weapon: "Pistols",
    portrait: "https://i.supaimg.com/579ea0e6-e34f-4d67-b86a-810acfc4b25c.png",
    splash: "https://i.supaimg.com/579ea0e6-e34f-4d67-b86a-810acfc4b25c.png",
    tags: ["DPS"],
    bio: "Authoritative yet compassionate leader, skilled in investigations, tactics, and split-second decisions."
  },
  
  {
    id: "kenziet",
    name: "Kenziet Felicia-Harrison",
    rarity: 5,
    role: "Main DPS",
    faction: "SSIA",
    element: "Electro",
    weapon: "Katana",
    portrait: "https://i.supaimg.com/c2468193-f5cc-4f2e-a07c-1cb6b69efa52.png",
    splash: "https://i.supaimg.com/c2468193-f5cc-4f2e-a07c-1cb6b69efa52.png",
    tags: ["DPS"],
    bio: "Confident and fiercely protective. Master of behavioral analysis and resilience."
  },
  
  {
    id: "fritz",
    name: "Fritz Von Viermitz",
    rarity: 5,
    role: "Support DPS",
    faction: "SSIA",
    element: "Cryo",
    weapon: "SMGs",
    portrait: "https://i.supaimg.com/19def742-4339-449e-b35f-fdcfd23f8e28.png",
    splash: "https://i.supaimg.com/19def742-4339-449e-b35f-fdcfd23f8e28.png",
    tags: ["Support", "DPS"],
    bio: "Calm, strategic, and brilliant in behavioral profiling."
  },
  
  {
    id: "hannabi",
    name: "Hannabi Ingrid Stephanie",
    rarity: 5,
    role: "Healer",
    faction: "SSIA",
    element: "Hydro",
    weapon: "Sword",
    portrait: "https://i.supaimg.com/b3da42ad-02aa-4f1a-b499-acc775586122/768ec0e5-e03b-41d4-9da1-91b25a972647.png",
    splash: "https://i.supaimg.com/b3da42ad-02aa-4f1a-b499-acc775586122/768ec0e5-e03b-41d4-9da1-91b25a972647.png",
    tags: ["Support", "Hydro"],
    bio: "A timid probie with a heart of gold."
  },
  
  {
    id: "kirisame-ayaka",
    name: "Kirisame Ayaka",
    rarity: 5,
    role: "DPS",
    faction: "SIRA",
    element: "Electro",
    weapon: "Katana",
    portrait: "https://i.supaimg.com/b3da42ad-02aa-4f1a-b499-acc775586122/44f41b50-6839-48a7-b9e7-efc0d75590cd.png",
    splash: "https://i.supaimg.com/b3da42ad-02aa-4f1a-b499-acc775586122/44f41b50-6839-48a7-b9e7-efc0d75590cd.png",
    tags: ["DPS"],
    bio: "Kirisame Ayaka is a Youthful Adult Woman, around 30 years old, a model type body, She's a SIRA (Shinkyou Imperial Reconnaissance Agency), she's in a position of Special Agent In Charge,  Always Determined but Softer towards anyone on SIRA, but her fighting Skills with a Katana is another level of Mastery."
  },
  
  {
    id: "nexon-dyke-martinez",
    name: "Nexon Dyke Martinez",
    rarity: 4,
    role: "Burst, Shield, Geo DEF Buffer",
    faction: "SSIA",
    element: "Geo",
    weapon: "Gauntlet",
    portrait: "https://i.supaimg.com/b3da42ad-02aa-4f1a-b499-acc775586122/c95589f6-13a8-481d-9336-504ff271c9c9.png",
    splash: "https://i.supaimg.com/b3da42ad-02aa-4f1a-b499-acc775586122/c95589f6-13a8-481d-9336-504ff271c9c9.png",
    tags: ["DEF Ally Buffer"],
    bio: "Nexon Dyke Martinez, known simply as Nexon, is an energetic and spirited Special Agent within the SSIA. Born in Little Hansa, a small but vibrant town in the Federal Republic of Mittlemagizste, Nexon grew up surrounded by the bustling activity of a close-knit community. He is known for his comedic personality, humor, and seemingly carefree attitude."
  },
];

/* ────────────────────────────────────────────────────────── */
/* FILTER STATE                                               */
/* ────────────────────────────────────────────────────────── */

/**
 * Tracks which filters are currently active.
 * null means "show all" for that category.
 */
const activeFilters = {
  faction: null,   // e.g. "SSIA" | "SIRA" | null
  element: null,   // e.g. "Pyro" | "Electro" | null
  rarity: null     // e.g. 4 | 5 | null
};

/* ────────────────────────────────────────────────────────── */
/* UTILITIES                                                  */
/* ────────────────────────────────────────────────────────── */

const characterContainer = document.getElementById("characters-container");

function createStars(rarity) {
  return "⭐".repeat(rarity);
}

function storageKey(charId, type) {
  return `svc_${charId}_${type}`;
}

function saveCounter(charId, type, count) {
  localStorage.setItem(storageKey(charId, type), count);
}

function loadCounter(charId, type) {
  return parseInt(localStorage.getItem(storageKey(charId, type)) || "0", 10);
}

function emitToast(message) {
  document.dispatchEvent(
    new CustomEvent("toast", {
      detail: message
    })
  );
}

/* ────────────────────────────────────────────────────────── */
/* FILTER STYLES (injected into <head> at runtime)           */
/* ────────────────────────────────────────────────────────── */

function injectFilterStyles() {
  if (document.getElementById("filter-bar-styles")) return; // already injected

  const style = document.createElement("style");
  style.id = "filter-bar-styles";
  style.textContent = `
    #filter-bar {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin: 12px 0 20px;
    }

    .filter-row {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
    }

    .filter-label {
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--color-text-muted, #888);
      min-width: 64px;
    }

    .filter-btn-group {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .filter-btn {
      padding: 4px 12px;
      border-radius: 999px;
      border: 1px solid var(--color-border, #444);
      background: transparent;
      color: var(--color-text, #ddd);
      font-size: 0.8rem;
      cursor: pointer;
      transition: background 0.15s, color 0.15s, border-color 0.15s;
      white-space: nowrap;
    }

    .filter-btn:hover {
      border-color: var(--color-accent, #c89b3c);
      color: var(--color-accent, #c89b3c);
    }

    .filter-btn.active {
      background: var(--color-accent, #c89b3c);
      border-color: var(--color-accent, #c89b3c);
      color: #fff;
      font-weight: 600;
    }
  `;

  document.head.appendChild(style);
}

/* ────────────────────────────────────────────────────────── */
/* FILTER BAR                                                 */
/* ────────────────────────────────────────────────────────── */

/**
 * Derives unique sorted values from charactersData for a given key.
 * Used to auto-build filter buttons whenever new characters are added.
 */
function getUniqueValues(key) {
  const values = charactersData.map((c) => c[key]);
  return [...new Set(values)].sort((a, b) =>
    typeof a === "number" ? a - b : String(a).localeCompare(String(b))
  );
}

/**
 * Creates the full filter bar HTML and injects it right after the search bar.
 * Re-renders itself on every filter change to keep button active states in sync.
 */
function renderFilterBar() {
  // Remove existing bar so we can redraw it cleanly
  const existing = document.getElementById("filter-bar");
  if (existing) existing.remove();

  const factions  = getUniqueValues("faction");
  const elements  = getUniqueValues("element");
  const rarities  = getUniqueValues("rarity");

  const bar = document.createElement("div");
  bar.id = "filter-bar";

  // ── helper: build one filter row ──────────────────────────────────────────
  function buildRow(label, values, filterKey, labelFn) {
    const row = document.createElement("div");
    row.className = "filter-row";

    const title = document.createElement("span");
    title.className = "filter-label";
    title.textContent = label;
    row.appendChild(title);

    const btnWrap = document.createElement("div");
    btnWrap.className = "filter-btn-group";

    // "All" reset pill
    const allBtn = document.createElement("button");
    allBtn.className = "filter-btn" + (activeFilters[filterKey] === null ? " active" : "");
    allBtn.textContent = "All";
    allBtn.addEventListener("click", () => {
      activeFilters[filterKey] = null;
      renderFilterBar();
      applyFilters();
    });
    btnWrap.appendChild(allBtn);

    values.forEach((val) => {
      const btn = document.createElement("button");
      btn.className = "filter-btn" + (activeFilters[filterKey] === val ? " active" : "");
      btn.textContent = labelFn ? labelFn(val) : val;
      btn.addEventListener("click", () => {
        // Clicking the already-active filter deselects it (toggles off)
        activeFilters[filterKey] = activeFilters[filterKey] === val ? null : val;
        renderFilterBar();
        applyFilters();
      });
      btnWrap.appendChild(btn);
    });

    row.appendChild(btnWrap);
    return row;
  }

  bar.appendChild(buildRow("Faction",  factions, "faction", null));
  bar.appendChild(buildRow("Element",  elements, "element", (el) => getElementIcon(el)));
  bar.appendChild(buildRow("Rarity",   rarities, "rarity",  (r) => `${"⭐".repeat(r)} (${r}★)`));

  // Inject bar after the search bar wrapper
  const searchBar = document.getElementById("character-search");
  if (searchBar) {
    // Walk up to the nearest containing wrapper; fall back to inserting after the input itself
    const parent = searchBar.closest(".search-wrapper") || searchBar.parentElement;
    parent.insertAdjacentElement("afterend", bar);
  } else {
    // No search bar found — just prepend to the character container's parent
    characterContainer?.parentElement?.insertBefore(bar, characterContainer);
  }
}

/* ────────────────────────────────────────────────────────── */
/* MODAL SYSTEM                                               */
/* ────────────────────────────────────────────────────────── */

function createCharacterModal() {
  if (document.getElementById("character-modal")) return;

  const modal = document.createElement("div");
  modal.id = "character-modal";
  modal.innerHTML = `
    <div class="modal-overlay"></div>
    <div class="character-modal-content">
      <button class="modal-close-btn">✕</button>
      <div class="modal-body"></div>
    </div>
  `;

  document.body.appendChild(modal);

  const overlay = modal.querySelector(".modal-overlay");
  const closeBtn = modal.querySelector(".modal-close-btn");

  overlay.addEventListener("click", closeCharacterModal);
  closeBtn.addEventListener("click", closeCharacterModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeCharacterModal();
  });
}

function openCharacterModal(character) {
  const modal = document.getElementById("character-modal");
  const modalBody = modal.querySelector(".modal-body");

  modalBody.innerHTML = `
    <div class="modal-banner">
      <img src="${character.splash}" alt="${character.name}">
    </div>

    <div class="modal-info">
      <div class="modal-top">
        <div>
          <h2>${character.name}</h2>
          <p class="modal-rarity">${createStars(character.rarity)}</p>
        </div>
        <span class="modal-role">${character.role}</span>
      </div>

      <div class="modal-meta-grid">
        <div class="meta-box">
          <span>Element</span>
          <strong>${getElementIcon(character.element)}</strong>
        </div>
        <div class="meta-box">
          <span>Weapon</span>
          <strong>${character.weapon}</strong>
        </div>
        <div class="meta-box">
          <span>Faction</span>
          <strong>${character.faction}</strong>
        </div>
        <div class="meta-box">
          <span>Tags</span>
          <strong>${character.tags.join(", ")}</strong>
        </div>
      </div>

      <div class="modal-bio">
        <h3>Biography</h3>
        <p>${character.bio}</p>
      </div>
    </div>
  `;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCharacterModal() {
  const modal = document.getElementById("character-modal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

/* ────────────────────────────────────────────────────────── */
/* CARD CREATION                                               */
/* ────────────────────────────────────────────────────────── */

function createCharacterCard(character) {
  const card = document.createElement("article");
  card.className = "character-card reveal";

  // Store filter values as data attributes so applyFilters() can read them
  // without re-querying the DOM
  card.dataset.faction = character.faction;
  card.dataset.element = character.element;
  card.dataset.rarity  = character.rarity;
  card.dataset.name    = character.name.toLowerCase();

  const favCount  = loadCounter(character.id, "fav");
  const likeCount = loadCounter(character.id, "like");
  const ownCount  = loadCounter(character.id, "own");

  card.innerHTML = `
    <div class="rarity-bar rarity-${character.rarity}"></div>
    <div class="card-clickable">
      <div class="portrait">
        <img src="${character.portrait}" alt="${character.name}" loading="lazy">
        <div class="character-overlay">
          <span>VIEW PROFILE</span>
        </div>
      </div>

      <div class="info">
        <div class="character-header">
          <h2>${character.name}</h2>
          <span class="rarity">${createStars(character.rarity)}</span>
        </div>

        <div class="character-meta">
          <span>${getElementIcon(character.element)}</span>
          <span>${character.weapon}</span>
        </div>

        <div class="tag-group">
          ${character.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
        </div>

        <p class="char-bio">${character.bio}</p>
      </div>
    </div>

    <div class="char-actions">
      <button class="btn-char-action fav-btn">
        ❤️ <span>${favCount}</span>
      </button>
      <button class="btn-char-action like-btn">
        👍 <span>${likeCount}</span>
      </button>
      <button class="btn-char-action own-btn">
        ✅ <span>${ownCount}</span>
      </button>
    </div>
  `;

  card.querySelector(".card-clickable").addEventListener("click", () => {
    openCharacterModal(character);
  });

  const actionTypes = [
    { selector: ".fav-btn",  type: "fav",  message: `${character.name} added to Favorites!` },
    { selector: ".like-btn", type: "like", message: `You liked ${character.name}!` },
    { selector: ".own-btn",  type: "own",  message: `You own ${character.name}!` }
  ];

  actionTypes.forEach((action) => {
    const button = card.querySelector(action.selector);
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      let current = loadCounter(character.id, action.type);
      current++;
      button.querySelector("span").textContent = current;
      saveCounter(character.id, action.type, current);
      emitToast(action.message);
    });
  });

  return card;
}

/* ────────────────────────────────────────────────────────── */
/* RENDERING, SEARCH & FILTERING                              */
/* ────────────────────────────────────────────────────────── */

function renderCharacters() {
  if (!characterContainer) return;
  characterContainer.innerHTML = "";
  const fragment = document.createDocumentFragment();
  charactersData.forEach((character) => {
    fragment.appendChild(createCharacterCard(character));
  });
  characterContainer.appendChild(fragment);
  createCharacterModal();
  revealCards();
}

/**
 * Single source of truth for card visibility.
 * Combines the search input with all three active filters.
 */
function applyFilters() {
  const searchInput = (document.getElementById("character-search")?.value || "").toLowerCase();
  const cards = document.querySelectorAll(".character-card");

  cards.forEach((card) => {
    const nameMatch    = card.dataset.name.includes(searchInput);
    const factionMatch = activeFilters.faction === null || card.dataset.faction === activeFilters.faction;
    const elementMatch = activeFilters.element === null || card.dataset.element === activeFilters.element;
    const rarityMatch  = activeFilters.rarity  === null || Number(card.dataset.rarity) === activeFilters.rarity;

    card.style.display = (nameMatch && factionMatch && elementMatch && rarityMatch) ? "" : "none";
  });
}

// Keep the old name working so any external callers aren't broken
function filterCharacters() {
  applyFilters();
}

function revealCards() {
  const cards = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.1 }
  );
  cards.forEach((card) => observer.observe(card));
}

/* ────────────────────────────────────────────────────────── */
/* INIT                                                        */
/* ────────────────────────────────────────────────────────── */

document.addEventListener("DOMContentLoaded", () => {
  injectFilterStyles();
  renderCharacters();
  renderFilterBar();

  const search = document.getElementById("character-search");
  if (search) search.addEventListener("input", applyFilters);
});
