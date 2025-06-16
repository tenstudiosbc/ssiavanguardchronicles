const characters = {
    hannabi: {
        name: "Hannabi Ingrid Stephanie",
        role: "Hydro/Sword - Tank & Support",
        rarity: 5,
        element: "Hydro",
        weapon: "Sword",
        fullDescription: "A powerful frontline tank with exceptional defensive capabilities and healing support. With her high DEF of 134, she excels at protecting the team while providing crucial healing support.",
        stats: {
            defense: 134,
            healing: 90,
            control: 70
        },
        synergy: "Works best with Cryo (Fritz) for Freeze and Pyro (Jones) for Vaporize.",
        abilities: [
            "Heal (Support)",
            "Water (Hydro attack)",
            "High DEF Tank"
        ]
    },
    jones: {
        name: "Jones Harrison",
        role: "Pyro/Glock-18 - Main DPS",
        rarity: 5,
        element: "Pyro",
        weapon: "Glock-18",
        fullDescription: "A powerful DPS unit specializing in both single-target and AoE fire damage. His versatile kit makes him a cornerstone of many team compositions.",
        stats: {
            attack: 95,
            aoe: 85,
            precision: 80
        },
        synergy: "Works well with Geo (Eric) for stable frontline and Hydro (Hannabi) for Vaporize combos.",
        abilities: [
            "Fire (Single target)",
            "Flame (AoE)",
            "Vaporize Combo"
        ]
    },
    fritz: {
        name: "Fritz Viermitz",
        role: "Cryo/Glock-18 - Hybrid Damage & Control",
        rarity: 5,
        element: "Cryo",
        weapon: "Glock-18",
        fullDescription: "A control specialist who excels at slowing enemies with Blizzard while maintaining consistent damage output. Perfect for tactical combat situations.",
        stats: {
            control: 90,
            damage: 75,
            utility: 85
        },
        synergy: "Pairs perfectly with Hannabi for Freeze combos.",
        abilities: [
            "Blizzard (Cryo AoE)",
            "Crowd Control",
            "Freeze Combo"
        ]
    },
    player: {
        name: "You (The Player)",
        role: "Geo - Flexible Utility",
        rarity: 5,
        element: "Geo",
        weapon: "Variable",
        fullDescription: "A balanced support character with the ability to reinforce shields and provide tactical advantages. Highly adaptable to different combat situations.",
        stats: {
            adaptability: 95,
            support: 85,
            defense: 80
        },
        synergy: "Works best alongside Jones (Pyro) for Burn damage and Cryo (Fritz) for Shatter.",
        abilities: [
            "Shield Reinforcement",
            "Geo Mechanics",
            "Tactical Support"
        ]
    }
};

document.querySelectorAll('.read-more-btn').forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('.character-card');
        const charId = card.dataset.character;
        showCharacterDetails(charId);
    });
});

function showCharacterDetails(charId) {
    const char = characters[charId];
    const modal = document.getElementById('character-modal');
    const content = modal.querySelector('.modal-character-content');
    
    const stars = '★'.repeat(char.rarity);
    
    content.innerHTML = `
        <h2>${char.name}</h2>
        <div class="rarity">${stars}</div>
        <p class="character-role">${char.role}</p>
        <div class="character-full-desc">
            <p>${char.fullDescription}</p>
        </div>
        <div class="character-stats">
            <h3>Stats</h3>
            <div class="stats-grid">
                <div class="stat">
                    <label>Strength</label>
                    <div class="stat-bar" style="width: ${char.stats.strength}%"></div>
                </div>
                <div class="stat">
                    <label>Speed</label>
                    <div class="stat-bar" style="width: ${char.stats.speed}%"></div>
                </div>
                <div class="stat">
                    <label>Intelligence</label>
                    <div class="stat-bar" style="width: ${char.stats.intelligence}%"></div>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

document.querySelector('.close-btn').addEventListener('click', function() {
    document.getElementById('character-modal').style.display = 'none';
});

window.addEventListener('click', function(event) {
    const modal = document.getElementById('character-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
