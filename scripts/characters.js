const characters = {
    char1: {
        name: "Character Name 1",
        role: "Role/Class",
        fullDescription: "Full character description and background story...",
        stats: {
            strength: 85,
            speed: 75,
            intelligence: 90
        },
        abilities: [
            "Ability 1",
            "Ability 2",
            "Ability 3"
        ]
    }
    // Add more character data as needed
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
    
    content.innerHTML = `
        <h2>${char.name}</h2>
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
