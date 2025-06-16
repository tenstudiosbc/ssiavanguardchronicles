const characters = {
    hannabi: {
        name: "Hannabi Ingrid Stephanie",
        role: "Hydro/Sword - Tank & Support",
        rarity: 5,
        maxLevel: 99,
        element: "Hydro",
        weapon: {
            type: "Sword",
            icon: "images/weapons/sword.png"
        },
        portrait: "images/characters/hannabi.jpg",
        stats: {
            defense: 134,
            healing: 90,
            control: 70,
            hp: 12500,
            attack: 1450
        },
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
        maxLevel: 99,
        element: "Pyro",
        weapon: {
            type: "Glock-18",
            icon: "images/weapons/gun.png"
        },
        portrait: "images/characters/jones.jpg",
        stats: {
            attack: 2100,
            defense: 850,
            hp: 9800,
            critRate: 65,
            critDamage: 180
        }
    },
    fritz: {
        name: "Fritz Viermitz",
        role: "Cryo/Glock-18 - Hybrid Damage & Control",
        rarity: 5,
        maxLevel: 99,
        element: "Cryo",
        weapon: {
            type: "Glock-18",
            icon: "images/weapons/gun.png"
        },
        stats: {
            attack: 1850,
            defense: 920,
            hp: 10200,
            critRate: 55,
            critDamage: 150
        }
    },
    margaret: {
        name: "Margaret Stephanie",
        role: "Polearm - Support DPS",
        rarity: 4,
        maxLevel: 99,
        element: "Anemo",
        weapon: {
            type: "Polearm",
            icon: "images/weapons/polearm.png"
        },
        stats: {
            attack: 1650,
            defense: 780,
            hp: 8900,
            critRate: 45,
            critDamage: 130
        }
    },
    kenziet: {
        name: "Kenziet Felicia-Harrison",
        role: "Electro/Katana - Main DPS",
        rarity: 5,
        maxLevel: 99,
        element: "Electro",
        weapon: {
            type: "Katana",
            icon: "images/weapons/katana.png"
        },
        stats: {
            attack: 2200,
            defense: 780,
            hp: 9500,
            critRate: 72,
            critDamage: 195
        }
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
    const content = `
        <div class="char-header">
            <div class="weapon-icon">
                <img src="${char.weapon.icon}" alt="${char.weapon.type}">
            </div>
            <div class="char-title">
                <h2>${char.name}</h2>
                <div class="rarity">${'★'.repeat(char.rarity)}</div>
                <div class="level">Max Level: ${char.maxLevel}</div>
            </div>
        </div>
        <div class="stats-container">
            <div class="stat-group">
                <h3>Base Stats</h3>
                <div class="stat-bar">
                    <span>HP</span>
                    <div class="bar" style="width: ${char.stats.hp/100}px"></div>
                    <span>${char.stats.hp}</span>
                </div>
                <div class="stat-bar">
                    <span>ATK</span>
                    <div class="bar" style="width: ${char.stats.attack/10}px"></div>
                    <span>${char.stats.attack}</span>
                </div>
                <div class="stat-bar">
                    <span>DEF</span>
                    <div class="bar" style="width: ${char.stats.defense/5}px"></div>
                    <span>${char.stats.defense}</span>
                </div>
            </div>
        </div>
    `;
    
    document.querySelector('.modal-character-content').innerHTML = content;
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
