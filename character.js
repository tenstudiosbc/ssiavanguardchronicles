// character.js
const characters = [
  {
    name: "Jones Harrison",
    rarity: 5,
    element: "🔥 Pyro",
    weapon: "Pistols",
    portrait: "https://i.imgur.com/xW4XkY3.png", // example external URL
    bio: "Authoritative yet compassionate leader, skilled in investigations, tactics, and split-second decisions."
  },
  {
    name: "Kenziet Felicia-Harrison",
    rarity: 5,
    element: "⚡ Electro",
    weapon: "Katana",
    portrait: "https://i.imgur.com/aRmNnWa.png",
    bio: "Confident and fiercely protective. Master of behavioral analysis and resilience."
  },
  {
    name: "Fritz Von Viermitz",
    rarity: 5,
    element: "❄️ Cryo",
    weapon: "SMGs",
    portrait: "https://i.imgur.com/qcGJ6Wz.png",
    bio: "Calm, strategic, and brilliant in behavioral profiling."
  },
  {
    name: "Nexon Dyke Martinez",
    rarity: 4,
    element: "🪨 Geo",
    weapon: "Gauntlets",
    portrait: "https://i.imgur.com/0T0i6Mc.png",
    bio: "Charismatic and agile with strong combat and intel skills."
  },
  {
    name: "Lucia Hoenigsman",
    rarity: 4,
    element: "💨 Aero",
    weapon: "Polearm / SMGs",
    portrait: "https://i.imgur.com/JXjWc6A.png",
    bio: "Charming, hot, and determined. Leads the Mittlemazigste SSIA Field Office."
  }
];

// Utility to create star rarity
function createStars(rarity) {
  let stars = "";
  for (let i = 0; i < rarity; i++) {
    stars += "⭐";
  }
  return stars;
}

// Inject characters into HTML
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("character-container");

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
        <p>${char.bio}</p>
      </div>
    `;

    container.appendChild(card);
  });
});
