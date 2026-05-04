/* ═══════════════════════════════════════════════════════════ */
/* SSIA VANGUARD CHRONICLES - TEAM BUILDER SCRIPT             */
/* Team Management, PDF Export, and UI Interactions            */
/* ═══════════════════════════════════════════════════════════ */

/* ────────────────────────────────────────────────────────── */
/* ELEMENTAL COUNTER SYSTEM                                    */
/* ────────────────────────────────────────────────────────– */

const elementalCounters = {
  "Pyro": {
    emoji: "🔥",
    counters: ["Cryo", "Hydro"],
    countersText: "Weak to Cryo & Hydro",
    tip: "Use against Aero and Geo"
  },
  "Electro": {
    emoji: "⚡",
    counters: ["Cryo", "Geo"],
    countersText: "Weak to Cryo & Geo",
    tip: "Use against Hydro"
  },
  "Cryo": {
    emoji: "❄️",
    counters: ["Pyro", "Hydro"],
    countersText: "Weak to Pyro & Hydro",
    tip: "Use against Electro and Aero"
  },
  "Hydro": {
    emoji: "💧",
    counters: ["Electro", "Pyro"],
    countersText: "Weak to Electro & Pyro",
    tip: "Use against Pyro and Geo"
  },
  "Aero": {
    emoji: "🍃",
    counters: ["Pyro", "Electro"],
    countersText: "Weak to Pyro & Electro",
    tip: "Use against Cryo and Hydro"
  },
  "Geo": {
    emoji: "🪨",
    counters: ["Cryo", "Electro"],
    countersText: "Weak to Cryo & Electro",
    tip: "Use against Hydro"
  },
  "Dendro": {
    emoji: "🌿",
    counters: ["Pyro", "Cryo"],
    countersText: "Weak to Pyro & Cryo",
    tip: "Use against Hydro and Geo"
  },
  "Physical": {
    emoji: "⚔️",
    counters: [],
    countersText: "Versatile damage type",
    tip: "Works with all elements"
  },
  "Void": {
    emoji: "🌌",
    counters: [],
    countersText: "Rare dark element",
    tip: "Unique properties"
  },
  "Spectro": {
    emoji: "🔆",
    counters: [],
    countersText: "Light element",
    tip: "Enhanced by other elements"
  }
};

/* ────────────────────────────────────────────────────────── */
/* STATE MANAGEMENT                                            */
/* ────────────────────────────────────────────────────────– */

const teamBuilderState = {
  team: [null, null, null, null], // 4 party members
  selectedCharacterId: null,
  currentSearchQuery: "",
  isMobile: window.innerWidth <= 768
};

/* ────────────────────────────────────────────────────────── */
/* INITIALIZATION                                              */
/* ────────────────────────────────────────────────────────– */

document.addEventListener("DOMContentLoaded", () => {
  initializeTeamBuilder();
  setupEventListeners();
  hidePageLoader();
});

function initializeTeamBuilder() {
  if (typeof charactersData === "undefined") {
    console.error("Character data not loaded");
    return;
  }

  renderCharacterList(charactersData);
  setupDragAndDrop();
  updateTeamCounter();
  updateCounterInfo();
}

/* ────────────────────────────────────────────────────────── */
/* CHARACTER LIST RENDERING                                    */
/* ────────────────────────────────────────────────────────– */

function renderCharacterList(characters) {
  const container = document.getElementById("character-list-container");
  const modalContainer = document.getElementById("modal-character-list");

  if (!container) return;

  container.innerHTML = "";
  if (modalContainer) modalContainer.innerHTML = "";

  characters.forEach((character, index) => {
    const charItem = createCharacterItem(character, index);
    container.appendChild(charItem);

    if (modalContainer) {
      const charItemClone = createCharacterItem(character, index);
      modalContainer.appendChild(charItemClone);
    }
  });
}

function createCharacterItem(character, index) {
  const item = document.createElement("div");
  item.className = "tb-char-item";
  item.style.setProperty("--index", index);
  item.draggable = true;
  item.dataset.characterId = character.id;

  const element = elementalCounters[character.element] || {};

  item.innerHTML = `
    <div class="tb-char-portrait">
      <img src="${character.portrait}" alt="${character.name}" loading="lazy">
    </div>
    <div class="tb-char-info">
      <div class="tb-char-name">${character.name}</div>
      <div class="tb-char-meta">
        <span class="tb-char-element">${element.emoji || "?"} ${character.element}</span>
        <span class="tb-char-role">${character.role}</span>
      </div>
    </div>
    <button class="tb-char-action" title="Add to team">
      ➕
    </button>
  `;

  // Add click handler
  item.addEventListener("click", () => addCharacterToTeam(character));

  // Drag handlers
  item.addEventListener("dragstart", (e) => {
    e.dataTransfer.effectAllowed = "copy";
    e.dataTransfer.setData("characterId", character.id);
  });

  return item;
}

/* ────────────────────────────────────────────────────────── */
/* TEAM MANAGEMENT                                             */
/* ────────────────────────────────────────────────────────– */

function addCharacterToTeam(character) {
  // Check if already in team
  if (teamBuilderState.team.some(member => member?.id === character.id)) {
    showToast("Character already in team!", "warning");
    return;
  }

  // Find first empty slot
  const emptyIndex = teamBuilderState.team.findIndex(member => member === null);

  if (emptyIndex === -1) {
    showToast("Team is full! Remove a character first.", "warning");
    return;
  }

  teamBuilderState.team[emptyIndex] = character;
  updateTeamDisplay();
  updateTeamCounter();
  updateCounterInfo();

  // Close modal on mobile
  if (teamBuilderState.isMobile) {
    closeCharacterModal();
  }

  showToast(`${character.name} added to Slot ${emptyIndex + 1}!`, "success");
}

function removeCharacterFromSlot(slotIndex) {
  const character = teamBuilderState.team[slotIndex];
  if (character) {
    teamBuilderState.team[slotIndex] = null;
    updateTeamDisplay();
    updateTeamCounter();
    updateCounterInfo();
    showToast(`${character.name} removed from team`, "info");
  }
}

function clearTeam() {
  if (teamBuilderState.team.some(m => m !== null)) {
    if (confirm("Are you sure? This will clear your entire team.")) {
      teamBuilderState.team = [null, null, null, null];
      updateTeamDisplay();
      updateTeamCounter();
      updateCounterInfo();
      showToast("Team cleared!", "info");
    }
  }
}

/* ────────────────────────────────────────────────────────– */
/* TEAM DISPLAY UPDATE                                        */
/* ────────────────────────────────────────────────────────– */

function updateTeamDisplay() {
  const slotsContainer = document.getElementById("team-slots-container");
  if (!slotsContainer) return;

  const slots = slotsContainer.querySelectorAll(".tb-team-slot");

  slots.forEach((slot, index) => {
    const character = teamBuilderState.team[index];
    const slotNum = index + 1;

    if (character) {
      slot.classList.add("filled");
      slot.classList.remove("empty");

      const element = elementalCounters[character.element] || {};

      slot.innerHTML = `
        <div class="tb-slot-content">
          <div class="tb-slot-portrait">
            <img src="${character.portrait}" alt="${character.name}" loading="lazy">
          </div>
          <div class="tb-slot-info">
            <div class="tb-slot-name">${character.name}</div>
            <div class="tb-slot-element">${element.emoji || "?"} ${character.element}</div>
          </div>
          <button class="tb-slot-remove" title="Remove from team">✕</button>
        </div>
      `;

      // Add remove handler
      slot.querySelector(".tb-slot-remove").addEventListener("click", (e) => {
        e.stopPropagation();
        removeCharacterFromSlot(index);
      });

      // Add click to open modal on mobile
      slot.addEventListener("click", () => {
        if (teamBuilderState.isMobile) {
          removeCharacterFromSlot(index);
        }
      });
    } else {
      slot.classList.remove("filled");
      slot.classList.add("empty");
      slot.innerHTML = `
        <div class="slot-placeholder">
          <span class="slot-number">SLOT ${slotNum}</span>
          <span class="slot-label">Drag or Click to Add</span>
        </div>
      `;
    }
  });
}

function updateTeamCounter() {
  const counter = document.getElementById("team-count");
  if (!counter) return;

  const filledCount = teamBuilderState.team.filter(m => m !== null).length;
  counter.textContent = `${filledCount} / 4 Members`;
}

/* ────────────────────────────────────────────────────────– */
/* ELEMENTAL COUNTER INFO                                     */
/* ────────────────────────────────────────────────────────– */

function updateCounterInfo() {
  const table = document.getElementById("counter-table");
  if (!table) return;

  const teamElements = teamBuilderState.team
    .filter(m => m !== null)
    .map(m => m.element);

  const uniqueElements = [...new Set(teamElements)];

  table.innerHTML = "";

  if (uniqueElements.length === 0) {
    table.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 2rem 1rem;">
        Add characters to see elemental coverage
      </div>
    `;
    return;
  }

  uniqueElements.forEach(element => {
    const info = elementalCounters[element];
    const count = teamElements.filter(e => e === element).length;

    const item = document.createElement("div");
    item.className = "tb-counter-item";
    item.innerHTML = `
      <div class="tb-counter-element">${info.emoji}</div>
      <div class="tb-counter-name">${element}</div>
      <div class="tb-counter-text">
        ${info.countersText}<br>
        ×${count}
      </div>
    `;

    table.appendChild(item);
  });
}

/* ────────────────────────────────────────────────────────– */
/* SEARCH FUNCTIONALITY                                        */
/* ────────────────────────────────────────────────────────– */

function setupSearchListener() {
  const searchInput = document.getElementById("team-character-search");
  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    teamBuilderState.currentSearchQuery = e.target.value.toLowerCase();
    filterCharacterList();
  });
}

function filterCharacterList() {
  const query = teamBuilderState.currentSearchQuery;
  const items = document.querySelectorAll(".tb-char-item");

  items.forEach(item => {
    const name = item.querySelector(".tb-char-name")?.textContent.toLowerCase();
    const element = item.querySelector(".tb-char-element")?.textContent.toLowerCase();
    const role = item.querySelector(".tb-char-role")?.textContent.toLowerCase();

    const matches = !query ||
      name?.includes(query) ||
      element?.includes(query) ||
      role?.includes(query);

    item.style.display = matches ? "" : "none";
  });
}

/* ────────────────────────────────────────────────────────– */
/* DRAG AND DROP                                               */
/* ────────────────────────────────────────────────────────– */

function setupDragAndDrop() {
  const slots = document.querySelectorAll(".tb-team-slot");

  slots.forEach(slot => {
    slot.addEventListener("dragover", (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
      slot.style.opacity = "0.8";
    });

    slot.addEventListener("dragleave", () => {
      slot.style.opacity = "1";
    });

    slot.addEventListener("drop", (e) => {
      e.preventDefault();
      slot.style.opacity = "1";

      const characterId = e.dataTransfer.getData("characterId");
      const character = charactersData.find(c => c.id === characterId);

      if (character) {
        const slotIndex = [...slots].indexOf(slot);
        const oldCharacter = teamBuilderState.team[slotIndex];

        // Check if character already in team
        if (teamBuilderState.team.some(m => m?.id === characterId)) {
          showToast("Character already in team!", "warning");
          return;
        }

        teamBuilderState.team[slotIndex] = character;
        updateTeamDisplay();
        updateTeamCounter();
        updateCounterInfo();
        showToast(`${character.name} added to Slot ${slotIndex + 1}!`, "success");
      }
    });
  });
}

/* ────────────────────────────────────────────────────────– */
/* PDF EXPORT                                                  */
/* ────────────────────────────────────────────────────────– */

function exportTeamAsPDF() {
  const filledCount = teamBuilderState.team.filter(m => m !== null).length;

  if (filledCount === 0) {
    showToast("Add team members before exporting!", "warning");
    return;
  }

  // Create export content
  const exportContent = createPDFContent();
  const element = document.createElement("div");
  element.innerHTML = exportContent;

  const opt = {
    margin: 10,
    filename: "ssia-team-builder.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { orientation: "portrait", unit: "mm", format: "a4" }
  };

  html2pdf().set(opt).from(element).save();
  showToast("PDF exported successfully!", "success");
}

function createPDFContent() {
  const timestamp = new Date().toLocaleString();
  const elements = teamBuilderState.team
    .filter(m => m !== null)
    .map(m => elementalCounters[m.element] || {});

  let content = `
    <div style="font-family: Arial, sans-serif; color: #333; margin-bottom: 20px;">
      <h1 style="color: #00f5d4; text-align: center; border-bottom: 2px solid #00f5d4; padding-bottom: 10px;">
        SSIA VANGUARD CHRONICLES - TEAM ROSTER
      </h1>
      <p style="text-align: center; color: #666; font-size: 12px;">Generated: ${timestamp}</p>
      
      <h2 style="color: #0094ff; margin-top: 20px; border-left: 4px solid #0094ff; padding-left: 10px;">
        Team Members
      </h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
        <thead>
          <tr style="background-color: #00f5d4; color: white;">
            <th style="padding: 10px; text-align: left; border: 1px solid #ccc;">Slot</th>
            <th style="padding: 10px; text-align: left; border: 1px solid #ccc;">Name</th>
            <th style="padding: 10px; text-align: left; border: 1px solid #ccc;">Element</th>
            <th style="padding: 10px; text-align: left; border: 1px solid #ccc;">Role</th>
          </tr>
        </thead>
        <tbody>
  `;

  teamBuilderState.team.forEach((character, index) => {
    if (character) {
      const elementInfo = elementalCounters[character.element] || {};
      content += `
        <tr style="background-color: ${index % 2 === 0 ? "#f9f9f9" : "#fff"}; border: 1px solid #ccc;">
          <td style="padding: 10px; border: 1px solid #ccc;"><strong>${index + 1}</strong></td>
          <td style="padding: 10px; border: 1px solid #ccc;"><strong>${character.name}</strong></td>
          <td style="padding: 10px; border: 1px solid #ccc;">${elementInfo.emoji} ${character.element}</td>
          <td style="padding: 10px; border: 1px solid #ccc;">${character.role}</td>
        </tr>
      `;
    }
  });

  content += `
        </tbody>
      </table>

      <h2 style="color: #0094ff; margin-top: 20px; border-left: 4px solid #0094ff; padding-left: 10px;">
        Elemental Coverage
      </h2>
      <div style="margin-top: 10px;">
  `;

  const teamElements = teamBuilderState.team
    .filter(m => m !== null)
    .map(m => m.element);

  const uniqueElements = [...new Set(teamElements)];

  uniqueElements.forEach(element => {
    const info = elementalCounters[element];
    const count = teamElements.filter(e => e === element).length;

    content += `
      <div style="margin-bottom: 15px; padding: 10px; border-left: 4px solid #00f5d4; background-color: #f0f0f0;">
        <strong>${info.emoji} ${element}</strong> (×${count})<br>
        <small>${info.countersText}</small>
      </div>
    `;
  });

  content += `
      </div>

      <h2 style="color: #0094ff; margin-top: 20px; border-left: 4px solid #0094ff; padding-left: 10px;">
        Team Building Tips
      </h2>
      <ul style="margin-top: 10px; line-height: 1.8;">
        <li>⚔️ Balance DPS with Support roles</li>
        <li>🔄 Mix elemental types for versatility</li>
        <li>❤️ Include at least one healer</li>
        <li>🎯 Consider weapon synergies</li>
      </ul>

      <p style="margin-top: 20px; font-size: 12px; color: #999; text-align: center;">
        SSIA Vanguard Chronicles © 2024
      </p>
    </div>
  `;

  return content;
}

/* ────────────────────────────────────────────────────────– */
/* MODAL MANAGEMENT (MOBILE)                                  */
/* ────────────────────────────────────────────────────────– */

function openCharacterModal() {
  const modal = document.getElementById("character-modal");
  if (modal) {
    modal.classList.add("active");
  }
}

function closeCharacterModal() {
  const modal = document.getElementById("character-modal");
  if (modal) {
    modal.classList.remove("active");
  }
}

/* ────────────────────────────────────────────────────────– */
/* EVENT LISTENERS SETUP                                      */
/* ────────────────────────────────────────────────────────– */

function setupEventListeners() {
  // PDF Export
  const pdfBtn = document.getElementById("save-pdf-btn");
  if (pdfBtn) {
    pdfBtn.addEventListener("click", exportTeamAsPDF);
  }

  // Clear Team
  const clearBtn = document.getElementById("clear-team-btn");
  if (clearBtn) {
    clearBtn.addEventListener("click", clearTeam);
  }

  // Search
  setupSearchListener();

  // Modal Close
  const modalCloseBtn = document.getElementById("modal-close-btn");
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeCharacterModal);
  }

  // Close modal when clicking outside
  const modal = document.getElementById("character-modal");
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeCharacterModal();
      }
    });
  }

  // Handle window resize for mobile detection
  window.addEventListener("resize", () => {
    teamBuilderState.isMobile = window.innerWidth <= 768;
  });
}

/* ────────────────────────────────────────────────────────– */
/* TOAST NOTIFICATIONS                                        */
/* ────────────────────────────────────────────────────────– */

function showToast(message, type = "info") {
  const toaster = document.getElementById("toaster");
  if (!toaster) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toast.style.cssText = `
    padding: 1rem 1.5rem;
    margin: 0.5rem;
    border-radius: 10px;
    background: ${
      type === "success" ? "rgba(0, 245, 212, 0.9)" :
      type === "warning" ? "rgba(240, 192, 96, 0.9)" :
      type === "error" ? "rgba(255, 64, 96, 0.9)" :
      "rgba(0, 148, 255, 0.9)"
    };
    color: white;
    font-family: var(--f-mono);
    font-size: 0.85rem;
    font-weight: 700;
    animation: slideIn 0.3s ease;
    position: relative;
    z-index: 999;
  `;

  toaster.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "slideOut 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/* ────────────────────────────────────────────────────────– */
/* PAGE LOADER                                                */
/* ────────────────────────────────────────────────────────– */

function hidePageLoader() {
  const loader = document.getElementById("page-loader");
  if (loader) {
    loader.classList.add("hide");
    setTimeout(() => {
      loader.remove();
    }, 500);
  }
}
