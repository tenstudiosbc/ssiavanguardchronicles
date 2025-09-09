const characters = [
  {
    name: "Jones Harrison",
    rarity: 5,
    element: "🔥 Pyro",
    weapon: "Pistols",
    portrait: "https://i.supaimg.com/579ea0e6-e34f-4d67-b86a-810acfc4b25c.png",
    tags: ["DPS"],
    bio: "Authoritative yet compassionate leader, skilled in investigations, tactics, and split-second decisions."
  },
  {
    name: "Kenziet Felicia-Harrison",
    rarity: 5,
    element: "⚡ Electro",
    weapon: "Katana",
    portrait: "https://i.supaimg.com/c2468193-f5cc-4f2e-a07c-1cb6b69efa52.png",
    tags: ["DPS"],
    bio: "Confident and fiercely protective. Master of behavioral analysis and resilience, Sexy and Seductive."
  },
  {
    name: "Fritz Von Viermitz",
    rarity: 5,
    element: "❄️ Cryo",
    weapon: "SMGs",
    portrait: "https://i.supaimg.com/19def742-4339-449e-b35f-fdcfd23f8e28.png",
    tags: ["Support", "DPS"],
    bio: "Calm, strategic, and brilliant in behavioral profiling."
  },
  {
    name: "Nexon Dyke Martinez",
    rarity: 4,
    element: "🪨 Geo",
    weapon: "Gauntlets",
    portrait: "https://i.supaimg.com/ca4b490e-680c-49e5-9973-b4126dac49cf.png",
    tags: ["Tanker"],
    bio: "Charismatic and agile with strong combat and intel skills."
  },
  {
    name: "Lucia Hoenigsman",
    rarity: 4,
    element: "💨 Aero",
    weapon: "Polearm / SMGs",
    portrait: "https://i.supaimg.com/23ff2094-4eb8-478d-9418-ea51c0a5625b.png",
    tags: ["Support"],
    bio: "Charming, hot, and determined. Leads the Mittlemazigste SSIA Field Office."
  },
  {
    name: "Kirisame Ayaka",
    rarity: 5,
    element: "⚡️ Electro",
    weapon: "Katana",
    portrait: "https://i.supaimg.com/87b28d12-4010-4b07-b0c5-0a18b5cbe72a.png",
    tags: ["DPS"],
    bio: "Kirisame Ayaka is a Youthful Adult Woman, around 30 years old, a model type body, She's a SIRA (Shinkyou Imperial Reconnaissance Agency), she's in a position of Special Agent In Charge, Always Determined but Softer towards anyone on SIRA, but her fighting Skills with a Katana is another level of Mastery"
  }, 
  {
    name: "Princess Elaria Solenyra",
    rarity: 5,
    element: "✨️ Spectro",
    weapon: "Sword",
    portrait: "https://i.supaimg.com/5abe95cb-9ce1-4cbd-afd4-f38cd6d0496d.png",
    tags: ["DPS"],
    bio: "Legends say she is the “Eternal Bloom of Sa’Lume”, blessed by mystical waters hidden deep in the desert. Some worship her as a princess of Greenwhale, while others dismiss her as a clever trickster who discovered the fountain of youth. In truth, she’s just human—but her discipline, wit, and mastery of illusions give her the presence of someone immortal."
  },
  {
    name: "Hannabi Ingrid Stephanie",
    rarity: 5,
    element: "💧 Hydro",
    weapon: "Sword",
    portrait: "https://i.supaimg.com/52407d38-a3f4-4e1f-81ff-732bc2128645.png",
    tags: ["Support", "High DEF"],
    bio: "Timid, Reserved and a Kitten, Shes a Probie Special Agent in the team"
  },
  {
    name: "Margaret Stephanie",
    rarity: 4,
    element: "❄️ Cryo",
    weapon: "Polearm",
    portrait: "https://i.supaimg.com/141eaae9-011c-46c9-bc02-a3efbc9425e4.png",
    tags: ["Support"],
    bio: "A loveling Mother, School Counsulor"
  },  
];

// Utility to create star rarity
function createStars(rarity) {
  return "⭐".repeat(rarity);
}

// Save counter to localStorage
function saveCounter(charName, type, count) {
  const key = `${charName}_${type}`;
  localStorage.setItem(key, count);
}

// Load counter from localStorage
function loadCounter(charName, type) {
  const key = `${charName}_${type}`;
  return parseInt(localStorage.getItem(key) || "0", 10);
}

// Inject characters into HTML
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("characters-container");
  if (!container) return;

  characters.forEach(char => {
    const card = document.createElement("div");
    card.className = "character-card";

    // Load saved counters
    let favCount = loadCounter(char.name, "fav");
    let likeCount = loadCounter(char.name, "like");
    let ownCount = loadCounter(char.name, "own");

    card.innerHTML = `
      <div class="portrait">
        <img src="${char.portrait}" alt="${char.name}" />
      </div>
      <div class="info">
        <h2>${char.name}</h2>
        <p><strong>Rarity:</strong> ${createStars(char.rarity)}</p>
        <p><strong>Element:</strong> ${char.element}</p>
        <p><strong>Weapon:</strong> ${char.weapon}</p>
        <p><strong>Tags:</strong> ${char.tags.join(", ")}</p>
        <p>${char.bio}</p>
        <div class="actions">
          <button class="btn-action fav">❤️ Favorite (<span class="fav-count">${favCount}</span>)</button>
          <button class="btn-action like">👍 Like (<span class="like-count">${likeCount}</span>)</button>
          <button class="btn-action own">✅ Owned (<span class="own-count">${ownCount}</span>)</button>
        </div>
      </div>
    `;

    // Attach event listeners
    const favBtn = card.querySelector(".fav");
    const likeBtn = card.querySelector(".like");
    const ownBtn = card.querySelector(".own");

    favBtn.addEventListener("click", () => {
      favCount++;
      favBtn.querySelector(".fav-count").textContent = favCount;
      saveCounter(char.name, "fav", favCount);
      document.dispatchEvent(new CustomEvent("toast", { detail: `${char.name} added to Favorites!` }));
    });

    likeBtn.addEventListener("click", () => {
      likeCount++;
      likeBtn.querySelector(".like-count").textContent = likeCount;
      saveCounter(char.name, "like", likeCount);
      document.dispatchEvent(new CustomEvent("toast", { detail: `You liked ${char.name}!` }));
    });

    ownBtn.addEventListener("click", () => {
      ownCount++;
      ownBtn.querySelector(".own-count").textContent = ownCount;
      saveCounter(char.name, "own", ownCount);
      document.dispatchEvent(new CustomEvent("toast", { detail: `You own ${char.name}!` }));
    });

    container.appendChild(card);

    // Dispatch custom event so index.html can show toast
    document.dispatchEvent(new CustomEvent("charactersLoaded", { detail: { name: char.name } }));
  });
});
