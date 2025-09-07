const CHARACTERS = [
    {
        id: 'hannabi',
        name: 'Hannabi Ingrid Stephanie',
        title: 'Serenity Of Timidity',
        element: 'hydro',
        weapon: 'Sword',
        rarity: 5,
        image: './assets/images/characters/hannabi.jpg'
    },
    {
        id: 'kenziet',
        name: 'Kenziet Felicia-Harrison',
        title: 'Vixen Temptress',
        element: 'electro',
        weapon: 'Katana',
        rarity: 5,
        image: './assets/images/characters/kenziet.jpg'
    }
];

export function initCharacters() {
    const grid = document.querySelector('.characters__grid');
    if (!grid) return;

    CHARACTERS.forEach(char => {
        grid.appendChild(createCharacterCard(char));
    });
}

function createCharacterCard(char) {
    const card = document.createElement('div');
    card.className = 'character-card';
    card.innerHTML = `
        <img src="${char.image}" alt="${char.name}" class="character-card__image">
        <div class="character-card__content">
            <h3 class="character-card__title">${char.name}</h3>
            <span class="character-card__element element--${char.element}">${char.element}</span>
            <p class="character-card__title">${char.title}</p>
            <div class="character-card__stats">
                <span>${'★'.repeat(char.rarity)}</span>
                <span>${char.weapon}</span>
            </div>
        </div>
    `;
    return card;
}
