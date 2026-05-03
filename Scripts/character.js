/* ─────────────────────────────────────────────────────────────────────────
   CHARACTER DATA TEMPLATE
   Copy this block and paste it inside the charactersData array below.
   
   {
     id: "unique_id_here",
     name: "Character Name",
     rarity: 5,
     element: "🔥 Pyro",
     weapon: "Pistols",
     portrait: "https://your-image-url.com/img.png",
     tags: ["DPS", "Support"],
     bio: "Enter character backstory here..."
   },
   ───────────────────────────────────────────────────────────────────────── */

const charactersData = [
  {
    id: "jones",
    name: "Jones Harrison",
    rarity: 5,
    element: "🔥 Pyro",
    weapon: "Pistols",
    portrait: "https://i.supaimg.com/579ea0e6-e34f-4d67-b86a-810acfc4b25c.png",
    tags: ["DPS"],
    bio: "Authoritative yet compassionate leader, skilled in investigations, tactics, and split-second decisions."
  },
  {
    id: "kenziet",
    name: "Kenziet Felicia-Harrison",
    rarity: 5,
    element: "⚡ Electro",
    weapon: "Katana",
    portrait: "https://i.supaimg.com/c2468193-f5cc-4f2e-a07c-1cb6b69efa52.png",
    tags: ["DPS"],
    bio: "Confident and fiercely protective. Master of behavioral analysis and resilience, Sexy and Seductive."
  },
  {
    id: "fritz",
    name: "Fritz Von Viermitz",
    rarity: 5,
    element: "❄️ Cryo",
    weapon: "SMGs",
    portrait: "https://i.supaimg.com/19def742-4339-449e-b35f-fdcfd23f8e28.png",
    tags: ["Support", "DPS"],
    bio: "Calm, strategic, and brilliant in behavioral profiling."
  },
  {
    id: "nexon",
    name: "Nexon Dyke Martinez",
    rarity: 4,
    element: "🪨 Geo",
    weapon: "Gauntlets",
    portrait: "https://i.supaimg.com/ca4b490e-680c-49e5-9973-b4126dac49cf.png",
    tags: ["Tanker"],
    bio: "Charismatic and agile with strong combat and intel skills."
  },
  {
    id: "lucia",
    name: "Lucia Hoenigsman",
    rarity: 4,
    element: "💨 Aero",
    weapon: "Polearm / SMGs",
    portrait: "https://i.supaimg.com/23ff2094-4eb8-478d-9418-ea51c0a5625b.png",
    tags: ["Support"],
    bio: "Charming, hot, and determined. Leads the Mittlemazigste SSIA Field Office."
  },
  {
    id: "ayaka",
    name: "Kirisame Ayaka",
    rarity: 5,
    element: "⚡️ Electro",
    weapon: "Katana",
    portrait: "https://i.supaimg.com/87b28d12-4010-4b07-b0c5-0a18b5cbe72a.png",
    tags: ["DPS"],
    bio: "Special Agent In Charge at SIRA. Determined but softer towards her team, though her blade skills are mastery level."
  },
  {
    id: "elaria",
    name: "Princess Elaria Solenyra",
    rarity: 5,
    element: "✨️ Spectro",
    weapon: "Sword",
    portrait: "https://i.supaimg.com/5abe95cb-9ce1-4cbd-afd4-f38cd6d0496d.png",
    tags: ["DPS"],
    bio: "Blessed by mystical waters, her discipline and mastery of illusions give her the presence of an immortal."
  },
  {
    id: "hannabi",
    name: "Hannabi Ingrid Stephanie",
    rarity: 5,
    element: "💧 Hydro",
    weapon: "Sword",
    portrait: "https://i.supaimg.com/52407d38-a3f4-4e1f-81ff-732bc2128645.png",
    tags: ["Support"],
    bio: "Timid and reserved, she is a Probie Special Agent in the team."
  },
  {
    id: "margaret",
    name: "Margaret Stephanie",
    rarity: 4,
    element: "❄️ Cryo",
    weapon: "Polearm",
    portrait: "https://i.supaimg.com/141eaae9-011c-46c9-bc02-a3efbc9425e4.png",
    tags: ["Support"],
    bio: "A loving mother and school counselor."
  }
  // <--- PASTE NEW CHARACTERS FROM TEMPLATE HERE
];

/* ─── UTILITIES & STORAGE ─── */

const createStars = (rarity) => "⭐".repeat(rarity);
const saveStat = (id, type, count) => localStorage.setItem(`${id}_${type}`, count);
const loadStat = (id, type) => parseInt(localStorage.getItem(`${id}_${type}`) || "0", 10);

/* ─── TOAST NOTIFICATION ─── */

function showToast(message) {
  let toastRoot = document.getElementById("toast-root");
  if (!toastRoot) {
    toastRoot = document.createElement("div");
    toastRoot.id = "toast-root";
    // Inline styles if not present in CSS
    Object.assign(toastRoot.style, {
      position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: '9999'
    });
    document.body.appendChild(toastRoot);
  }

  const toast = document.createElement("div");
  toast.className = "toast-message";
  toast.textContent = message;
  // Apply quick styles
  Object.assign(toast.style, {
    background: '#6366f1', color: 'white', padding: '12px 24px', borderRadius: '50px',
    marginBottom: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.3)', animation: 'fadeUp 0.3s ease-out'
  });

  toastRoot.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 500);
  }, 2500);
}

/* ─── MODAL CONTROLS ─── */

function openCharacterModal(id) {
  const char = charactersData.find(c => c.id === id);
  if (!char) return;

  const modalOverlay = document.getElementById("character-modal");
  const modalBody = document.getElementById("modal-body");
  if (!modalOverlay || !modalBody) return;

  const fav = loadStat(char.id, "fav");
  const like = loadStat(char.id, "like");
  const own = loadStat(char.id, "own");

  modalBody.innerHTML = `
    <div class="modal-flex-container">
      <div class="modal-portrait">
        <img src="${char.portrait}" alt="${char.name}">
      </div>
      <div class="modal-details">
        <div class="modal-header">
          <h2>${char.name}</h2>
          <div class="stars">${createStars(char.rarity)}</div>
        </div>
        <div class="stats-grid">
          <div class="stat-item"><strong>Element:</strong> ${char.element}</div>
          <div class="stat-item"><strong>Weapon:</strong> ${char.weapon}</div>
          <div class="stat-item"><strong>Tags:</strong> ${char.tags.join(", ")}</div>
        </div>
        <p class="modal-bio">${char.bio}</p>
        <div class="modal-actions">
          <button onclick="handleStatClick('${char.id}', 'fav')">❤️ Fav (<span id="m-fav-${char.id}">${fav}</span>)</button>
          <button onclick="handleStatClick('${char.id}', 'like')">👍 Like (<span id="m-like-${char.id}">${like}</span>)</button>
          <button onclick="handleStatClick('${char.id}', 'own')">✅ Own (<span id="m-own-${char.id}">${own}</span>)</button>
        </div>
      </div>
    </div>
  `;

  modalOverlay.classList.add("active");
}

function closeCharacterModal() {
  const modalOverlay = document.getElementById("character-modal");
  if (modalOverlay) modalOverlay.classList.remove("active");
}

function handleStatClick(id, type) {
  let count = loadStat(id, type) + 1;
  saveStat(id, type, count);

  // Update Modal Numbers
  const modalCount = document.getElementById(`m-${type}-${id}`);
  if (modalCount) modalCount.textContent = count;

  // Update Card Numbers
  const cardCount = document.getElementById(`c-${type}-${id}`);
  if (cardCount) cardCount.textContent = count;

  showToast(`Updated ${type} for character!`);
}

/* ─── RENDERING ─── */

function renderCharacters() {
  const container = document.getElementById("characters-container");
  if (!container) return;

  container.innerHTML = "";

  charactersData.forEach((char) => {
    const card = document.createElement("div");
    card.className = "character-card";
    card.onclick = () => openCharacterModal(char.id);

    const fav = loadStat(char.id, "fav");

    card.innerHTML = `
      <div class="card-portrait">
        <img src="${char.portrait}" alt="${char.name}" loading="lazy">
        <div class="card-overlay-info">
           <span class="card-fav-count">❤️ <span id="c-fav-${char.id}">${fav}</span></span>
        </div>
      </div>
      <div class="card-content">
        <h3>${char.name}</h3>
        <div class="card-rarity">${createStars(char.rarity)}</div>
        <div class="card-element-tag">${char.element}</div>
      </div>
    `;

    container.appendChild(card);
  });
}

/* ─── SEARCH ─── */

function filterCharacters() {
  const query = document.getElementById("character-search")?.value.toLowerCase() || "";
  const cards = document.querySelectorAll(".character-card");

  cards.forEach((card) => {
    const name = card.querySelector("h3")?.textContent.toLowerCase() || "";
    card.style.display = name.includes(query) ? "" : "none";
  });
}

/* ─── INITIALIZATION ─── */

document.addEventListener("DOMContentLoaded", () => {
  renderCharacters();
  
  // Close modal when clicking outside content
  const modalOverlay = document.getElementById("character-modal");
  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeCharacterModal();
    });
  }
});
