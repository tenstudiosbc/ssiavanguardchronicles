/*
  SSIA: Vanguard Chronicles - Organisations / Factions Database
  File path on your website: ../Scripts/factions.js

  EASY EDIT GUIDE:
  - Add, remove, or edit entries inside the FACTIONS array.
  - Main fields you asked for are: name, headquartered, jurisdictions, and type.
  - You can leave optional fields blank, but keep the comma format valid.
  - For logos, put your image path in logo. Example: "../Assets/Logos/ssia.png"
*/

const FACTIONS = [
  {
    id: "ssia",
    name: "Sierra Secret Investigation Agency",
    shortName: "SSIA",
    type: "Confederacy Law Enforcement Agency",
    headquartered: "Bellemaire South District, Revolutionary Republic of Sandy Staat",
    jurisdictions: "Confederacy of Sierra Liudoxoya member states and cross-border major cases",
    leaderTitle: "Agency Director",
    currentLeader: "Classified / To Be Updated",
    parentInstitution: "Confederacy Department of Justice",
    alignment: "Confederacy / Lawful",
    status: "Active",
    logo: "",
    tags: ["Major Cases", "Counter-Intelligence", "Forensics", "Federal Operations"],
    summary: "The SSIA is a Confederacy-level investigative agency responsible for major crimes, counter-intelligence threats, corruption, murders, serial killers, espionage, and cross-border security operations across Sierra Liudoxoya.",
    divisions: [
      "Major Case Response Unit",
      "Forensics Division",
      "Medical Examiner Office",
      "Cyber Division",
      "Counter-Intelligence Division",
      "Fugitives Task Force",
      "HQ Security"
    ],
    duties: [
      "Investigate major cases that exceed local law enforcement capacity.",
      "Coordinate high-risk operations across multiple jurisdictions.",
      "Protect Confederacy-level justice interests and sensitive investigations."
    ],
    notes: "Primary agency featured in SSIA: Vanguard Chronicles. Jones Harrison, Fritz Von Viermitz, Kenziet Felicia-Harrison, Hannabi Ingrid Stephanie, Nexon Dyke Martinez, and Rogershin operate within this wider institution."
  },
  {
    id: "mia",
    name: "Mittlemazigste Investigation Agency",
    shortName: "MIA",
    type: "Confederacy-Level Sister Investigation Agency",
    headquartered: "Leivonia, Federal Republic of Mittlemazigste",
    jurisdictions: "Federal Republic of Mittlemazigste and selected Confederacy-linked investigations",
    leaderTitle: "Agency Director",
    currentLeader: "Klara Weisshart",
    parentInstitution: "Mittlemazigste / Confederacy-aligned justice structure",
    alignment: "Confederacy-Aligned / Lawful",
    status: "Active",
    logo: "",
    tags: ["Mittlemazigste", "Intelligence", "Investigation", "Strategic Support"],
    summary: "The MIA is an investigative agency connected to Mittlemazigste operations. It is separate from the SSIA but can become involved in overlapping investigations, inter-agency coordination, and intelligence-heavy cases.",
    divisions: [
      "Operations Directorate",
      "Field Investigation Division",
      "Intelligence Analysis Division",
      "Special Response Support"
    ],
    duties: [
      "Conduct national and federal investigations within Mittlemazigste.",
      "Assist with high-level intelligence and organised threat cases.",
      "Coordinate with SSIA when a case crosses agency boundaries."
    ],
    notes: "Silverstein Cronin and Lucile Silicia can be connected to this organisation depending on story arc implementation."
  },
  {
    id: "cbi",
    name: "Confederacy Bureau Investigation",
    shortName: "CBI",
    type: "Confederacy Investigation Bureau",
    headquartered: "Confederacy Administrative Sector, Sierra Liudoxoya",
    jurisdictions: "Confederacy-level domestic and intergovernmental investigations",
    leaderTitle: "Bureau Director",
    currentLeader: "To Be Updated",
    parentInstitution: "Confederacy of Sierra Liudoxoya",
    alignment: "Confederacy / Lawful",
    status: "Active",
    logo: "",
    tags: ["Bureau", "Inter-Agency", "Jurisdiction", "Rivalry"],
    summary: "The CBI is a separate Confederacy investigation bureau that may overlap with SSIA cases. Rivalry can occur when both agencies pursue different investigative priorities or claim jurisdiction over the same incident.",
    divisions: [
      "Bureau Field Offices",
      "Case Intelligence Division",
      "Organised Crime Desk",
      "Intergovernmental Liaison Unit"
    ],
    duties: [
      "Investigate Confederacy-level matters assigned to the bureau.",
      "Coordinate with local and national agencies.",
      "Handle cases where bureau jurisdiction is formally invoked."
    ],
    notes: "Useful for stories involving jurisdiction tension, agency politics, or cases where SSIA and CBI disagree on methods."
  },
  {
    id: "sira",
    name: "Shinkyou Imperial Reconnaissance Agency",
    shortName: "SIRA",
    type: "National / Imperial Reconnaissance Agency",
    headquartered: "Shinkyou Dominion",
    jurisdictions: "Shinkyou Dominion national and imperial security interests",
    leaderTitle: "Special Agent in Charge / Imperial Command Structure",
    currentLeader: "Kirisame Ayaka",
    parentInstitution: "Shinkyou Dominion",
    alignment: "Shinkyou Dominion / National Security",
    status: "Active",
    logo: "",
    tags: ["Shinkyou", "Reconnaissance", "Imperial", "Katana Operations"],
    summary: "SIRA is tied to the Shinkyou Dominion rather than the Confederacy structure. It focuses on reconnaissance, national security, and operations connected to Shinkyou imperial interests.",
    divisions: [
      "Reconnaissance Branch",
      "Imperial Intelligence Desk",
      "Field Operations Unit",
      "Special Security Detail"
    ],
    duties: [
      "Gather strategic intelligence for Shinkyou Dominion.",
      "Conduct reconnaissance and security operations.",
      "Protect national interests during external or internal threats."
    ],
    notes: "Kirisame Ayaka is associated with SIRA and can serve as a strong bridge between national agency stories and Vanguard Chronicles character arcs."
  },
  {
    id: "csl",
    name: "Confederacy of Sierra Liudoxoya",
    shortName: "CSL",
    type: "Supranational / Intergovernmental Institution",
    headquartered: "Sierra Liudoxoya Confederacy Seat",
    jurisdictions: "Member nations across Sierra Liudoxoya",
    leaderTitle: "Secretary of the Confederacy",
    currentLeader: "To Be Updated",
    parentInstitution: "Independent Supranational Body",
    alignment: "Intergovernmental / Neutral-Lawful",
    status: "Active",
    logo: "",
    tags: ["Confederacy", "International", "Justice", "Coordination"],
    summary: "The Confederacy of Sierra Liudoxoya functions as a supranational and intergovernmental body, similar in purpose to an international coordination organisation. It acknowledges and coordinates among nations rather than operating as a single federal world government.",
    divisions: [
      "Confederacy Department of Justice",
      "Confederacy Administrative Council",
      "Intergovernmental Coordination Offices",
      "Security and Justice Committees"
    ],
    duties: [
      "Coordinate between Sierra Liudoxoya nations.",
      "Maintain intergovernmental justice and security frameworks.",
      "Oversee or recognise Confederacy-level agencies such as SSIA."
    ],
    notes: "SSIA reports through the Confederacy Department of Justice and ultimately connects to the Secretary of the Confederacy."
  },
  {
    id: "sspd",
    name: "Sandy Staat Police Department",
    shortName: "SSPD",
    type: "Local / State Law Enforcement",
    headquartered: "Bellemaire, Revolutionary Republic of Sandy Staat",
    jurisdictions: "Revolutionary Republic of Sandy Staat local and city-level policing",
    leaderTitle: "Police Commissioner / Chief",
    currentLeader: "To Be Updated",
    parentInstitution: "Revolutionary Republic of Sandy Staat Government",
    alignment: "Local Government / Lawful",
    status: "Active",
    logo: "",
    tags: ["Police", "Patrol", "Bellemaire", "Local Cases"],
    summary: "The SSPD handles local policing responsibilities in Sandy Staat, including patrol, public safety, initial crime response, and coordination with higher agencies when a case escalates beyond local jurisdiction.",
    divisions: [
      "Patrol Division",
      "Detective Division",
      "Traffic Unit",
      "Emergency Response Unit"
    ],
    duties: [
      "Maintain local public safety.",
      "Respond to emergency calls and initial crime scenes.",
      "Support SSIA or other agencies when major cases begin in Sandy Staat territory."
    ],
    notes: "Useful as the first response agency before SSIA becomes involved in a major case."
  },
  {
    id: "solaris-command",
    name: "Solaris National Council Research",
    shortName: "SNCR",
    type: "Military / Antagonistic Command Structure",
    headquartered: "Solaris Imperial / Novoslavia-linked command sectors",
    jurisdictions: "Solaris military zones and covert influence areas",
    leaderTitle: "Commander",
    currentLeader: "Commander Vladimir Konstantin Voromir",
    parentInstitution: "Solaris Imperial Military Structure",
    alignment: "Hostile / Antagonistic",
    status: "Active Threat",
    logo: "",
    tags: ["Military", "Antagonist", "Solaris", "Command"],
    summary: "A hostile command structure connected to Solaris military power and covert operations. It can serve as an antagonistic faction during Leivonia and winterland-related arcs.",
    divisions: [
      "Command Staff",
      "Covert Military Cells",
      "Special Weapons Detail",
      "Field Suppression Units"
    ],
    duties: [
      "Execute Solaris military objectives.",
      "Control hostile field operations.",
      "Protect high-ranking commanders and strategic assets."
    ],
    notes: "Commander Vladimir Konstantin Voromir and Katya Volkov can be tied to this faction depending on the story chapter."
  }
];

function escapeHTML(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function listToHTML(items) {
  if (!items || !items.length) {
    return "<p>To Be Updated</p>";
  }

  return `
    <ul>
      ${items.map(item => `<li>${escapeHTML(item)}</li>`).join("")}
    </ul>
  `;
}

function getInitials(faction) {
  if (faction.shortName) {
    return faction.shortName.slice(0, 4).toUpperCase();
  }

  return faction.name
    .split(" ")
    .map(word => word[0])
    .join("")
    .slice(0, 4)
    .toUpperCase();
}

function getLogoHTML(faction) {
  if (faction.logo) {
    return `
      <div class="faction-logo">
        <img src="${escapeHTML(faction.logo)}" alt="${escapeHTML(faction.name)} logo">
      </div>
    `;
  }

  return `
    <div class="faction-logo">
      <span class="faction-logo-placeholder">${escapeHTML(getInitials(faction))}</span>
    </div>
  `;
}

function createFactionCard(faction) {
  const searchText = [
    faction.name,
    faction.shortName,
    faction.type,
    faction.headquartered,
    faction.jurisdictions,
    faction.leaderTitle,
    faction.currentLeader,
    faction.parentInstitution,
    faction.alignment,
    faction.status,
    faction.summary,
    ...(faction.tags || []),
    ...(faction.divisions || []),
    ...(faction.duties || [])
  ].join(" ").toLowerCase();

  return `
    <article class="faction-card reveal" data-faction-id="${escapeHTML(faction.id)}" data-search-text="${escapeHTML(searchText)}">

      <div class="faction-accent-bar"></div>

      <button class="faction-card-clickable" type="button" aria-label="View ${escapeHTML(faction.name)} profile">

        <div class="faction-card-inner">

          <div class="faction-logo-wrap">
            ${getLogoHTML(faction)}

            <div>
              <span class="faction-type">${escapeHTML(faction.type)}</span>
              <h2 class="faction-name">${escapeHTML(faction.name)}</h2>
              <div class="faction-short-name">${escapeHTML(faction.shortName || "Organisation")}</div>
            </div>
          </div>

          <div class="faction-info-list">

            <div class="faction-info-row">
              <span class="faction-label">Headquartered</span>
              <span class="faction-value">${escapeHTML(faction.headquartered)}</span>
            </div>

            <div class="faction-info-row">
              <span class="faction-label">Jurisdictions</span>
              <span class="faction-value">${escapeHTML(faction.jurisdictions)}</span>
            </div>

            <div class="faction-info-row">
              <span class="faction-label">Current Leader</span>
              <span class="faction-value">${escapeHTML(faction.currentLeader || "To Be Updated")}</span>
            </div>

          </div>

          <p class="faction-summary">
            ${escapeHTML(faction.summary)}
          </p>

          <div class="faction-tags">
            ${(faction.tags || []).slice(0, 5).map(tag => `<span class="faction-tag">${escapeHTML(tag)}</span>`).join("")}
          </div>

          <div class="faction-card-footer">
            <span>${escapeHTML(faction.status || "Active")}</span>
            <span class="faction-view-profile">VIEW DOSSIER</span>
          </div>

        </div>

      </button>

    </article>
  `;
}

function renderFactions() {
  const container = document.getElementById("factions-container");

  if (!container) return;

  if (!FACTIONS.length) {
    container.innerHTML = `
      <div class="faction-empty-state">
        No organisations have been logged yet.
      </div>
    `;
    return;
  }

  container.innerHTML = FACTIONS.map(createFactionCard).join("");

  container.querySelectorAll(".faction-card-clickable").forEach(button => {
    button.addEventListener("click", () => {
      const card = button.closest(".faction-card");
      const factionId = card?.dataset.factionId;
      openFactionModal(factionId);
    });
  });
}

function createModalRoot() {
  let root = document.getElementById("faction-modal-root");

  if (root) return root;

  root = document.createElement("div");
  root.id = "faction-modal-root";
  root.className = "faction-modal-root";
  root.setAttribute("aria-hidden", "true");

  document.body.appendChild(root);

  return root;
}

function openFactionModal(factionId) {
  const faction = FACTIONS.find(item => item.id === factionId);

  if (!faction) return;

  const root = createModalRoot();

  root.innerHTML = `
    <div class="faction-modal-backdrop" data-close-faction-modal></div>

    <section class="faction-modal" role="dialog" aria-modal="true" aria-labelledby="faction-modal-title">

      <div class="faction-modal-top">

        <div class="faction-modal-title-wrap">
          ${getLogoHTML(faction)}

          <div>
            <span class="faction-type">${escapeHTML(faction.type)}</span>
            <h2 class="faction-modal-title" id="faction-modal-title">${escapeHTML(faction.name)}</h2>
            <p class="faction-modal-subtitle">${escapeHTML(faction.shortName || "Organisation Dossier")}</p>
          </div>
        </div>

        <button class="faction-modal-close" type="button" aria-label="Close organisation dossier" data-close-faction-modal>
          ✕
        </button>

      </div>

      <div class="faction-modal-body">

        <p class="faction-modal-summary">
          ${escapeHTML(faction.summary)}
        </p>

        <div class="faction-modal-grid">

          <div class="faction-detail-box">
            <h3>Headquartered</h3>
            <p>${escapeHTML(faction.headquartered)}</p>
          </div>

          <div class="faction-detail-box">
            <h3>Jurisdictions</h3>
            <p>${escapeHTML(faction.jurisdictions)}</p>
          </div>

          <div class="faction-detail-box">
            <h3>Leadership</h3>
            <p><strong>${escapeHTML(faction.leaderTitle || "Leader")}:</strong> ${escapeHTML(faction.currentLeader || "To Be Updated")}</p>
          </div>

          <div class="faction-detail-box">
            <h3>Parent Institution</h3>
            <p>${escapeHTML(faction.parentInstitution || "Independent / To Be Updated")}</p>
          </div>

          <div class="faction-detail-box">
            <h3>Alignment</h3>
            <p>${escapeHTML(faction.alignment || "To Be Updated")}</p>
          </div>

          <div class="faction-detail-box">
            <h3>Status</h3>
            <p>${escapeHTML(faction.status || "To Be Updated")}</p>
          </div>

          <div class="faction-detail-box full">
            <h3>Divisions / Branches</h3>
            ${listToHTML(faction.divisions)}
          </div>

          <div class="faction-detail-box full">
            <h3>Duties / Mandate</h3>
            ${listToHTML(faction.duties)}
          </div>

          <div class="faction-detail-box full">
            <h3>Notes</h3>
            <p>${escapeHTML(faction.notes || "No additional notes yet.")}</p>
          </div>

          <div class="faction-detail-box full">
            <h3>Tags</h3>
            <div class="faction-tags">
              ${(faction.tags || []).map(tag => `<span class="faction-tag">${escapeHTML(tag)}</span>`).join("") || "<p>No tags yet.</p>"}
            </div>
          </div>

        </div>

      </div>

    </section>
  `;

  root.classList.add("active");
  root.setAttribute("aria-hidden", "false");
  document.body.classList.add("faction-modal-open");

  root.querySelectorAll("[data-close-faction-modal]").forEach(element => {
    element.addEventListener("click", closeFactionModal);
  });

  const closeButton = root.querySelector(".faction-modal-close");
  if (closeButton) closeButton.focus();
}

function closeFactionModal() {
  const root = document.getElementById("faction-modal-root");

  if (!root) return;

  root.classList.remove("active");
  root.setAttribute("aria-hidden", "true");
  root.innerHTML = "";
  document.body.classList.remove("faction-modal-open");
}

function filterFactions() {
  const searchInput = document.getElementById("faction-search");
  const query = (searchInput?.value || "").trim().toLowerCase();
  const cards = document.querySelectorAll(".faction-card");
  let visibleCount = 0;

  cards.forEach(card => {
    const text = card.dataset.searchText || "";
    const isVisible = !query || text.includes(query);

    card.style.display = isVisible ? "" : "none";

    if (isVisible) visibleCount += 1;
  });

  const container = document.getElementById("factions-container");
  let empty = document.getElementById("faction-empty-search");

  if (!visibleCount && container) {
    if (!empty) {
      empty = document.createElement("div");
      empty.id = "faction-empty-search";
      empty.className = "faction-empty-state";
      empty.textContent = "No organisation matches your search query.";
      container.appendChild(empty);
    }
  } else if (empty) {
    empty.remove();
  }

  const counter = document.getElementById("faction-count");

  if (counter) {
    counter.textContent = `${visibleCount} ORGANISATIONS LOGGED`;
  }
}

window.filterFactions = filterFactions;
window.openFactionModal = openFactionModal;
window.closeFactionModal = closeFactionModal;
window.FACTIONS = FACTIONS;

document.addEventListener("DOMContentLoaded", () => {
  renderFactions();
  filterFactions();

  const searchInput = document.getElementById("faction-search");

  if (searchInput) {
    searchInput.addEventListener("input", filterFactions);
  }

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeFactionModal();
    }
  });
});
