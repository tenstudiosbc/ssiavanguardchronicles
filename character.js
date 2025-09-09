const characters = [
  {
    name: "Jones Harrison",
    rarity: 5,
    element: "🔥 Pyro",
    weapon: "Pistols",
    portrait: "https://i.imgur.com/xW4XkY3.png",
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
    bio: "Confident and fiercely protective. Master of behavioral analysis and resilience."
  },
  {
    name: "Fritz Von Viermitz",
    rarity: 5,
    element: "❄️ Cryo",
    weapon: "SMGs",
    portrait: "https://i.imgur.com/qcGJ6Wz.png",
    tags: ["Support", "DPS"],
    bio: "Calm, strategic, and brilliant in behavioral profiling."
  },
  {
    name: "Nexon Dyke Martinez",
    rarity: 4,
    element: "🪨 Geo",
    weapon: "Gauntlets",
    portrait: "https://i.imgur.com/0T0i6Mc.png",
    tags: ["Tanker"],
    bio: "Charismatic and agile with strong combat and intel skills."
  },
  {
    name: "Lucia Hoenigsman",
    rarity: 4,
    element: "💨 Aero",
    weapon: "Polearm / SMGs",
    portrait: "https://i.imgur.com/JXjWc6A.png",
    tags: ["Support"],
    bio: "Charming, hot, and determined. Leads the Mittlemazigste SSIA Field Office."
  },
  {
    name: "Kirisame Ayaka",
    rarity: 5,
    element: "⚡️ Electro",
    weapon: "Katana",
    portrait: "https://i.imgur.com/0T0i6Mc.png",
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
];

// Utility to create star rarity
function createStars(rarity) {
  return "⭐".repeat(rarity);
}

// Inject characters into HTML
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("characters-container");
  if (!container) return;

  characters.forEach(char => {
    const card = document.createElement("div");
    card.className = "character-card";

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
      </div>
    `;

    container.appendChild(card);

    // Dispatch custom event so index.html can show toast
    document.dispatchEvent(new CustomEvent("charactersLoaded", { detail: { name: char.name } }));
  });
});
