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
    "Physical": "⚔️"
  };
  // Returns formatted string if found, otherwise just the element name
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
  }
];

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

  const favCount = loadCounter(character.id, "fav");
  const likeCount = loadCounter(character.id, "like");
  const ownCount = loadCounter(character.id, "own");

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
    { selector: ".fav-btn", type: "fav", message: `${character.name} added to Favorites!` },
    { selector: ".like-btn", type: "like", message: `You liked ${character.name}!` },
    { selector: ".own-btn", type: "own", message: `You own ${character.name}!` }
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
/* RENDERING & SEARCH                                          */
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

function filterCharacters() {
  const input = document.getElementById("character-search").value.toLowerCase();
  const cards = document.querySelectorAll(".character-card");
  cards.forEach((card) => {
    const name = card.querySelector("h2").textContent.toLowerCase();
    card.style.display = name.includes(input) ? "" : "none";
  });
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

document.addEventListener("DOMContentLoaded", () => {
  renderCharacters();
  const search = document.getElementById("character-search");
  if (search) search.addEventListener("input", filterCharacters);
});
