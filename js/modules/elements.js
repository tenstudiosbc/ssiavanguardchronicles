const elements = {
  pyro: { strong: ['aero', 'spectro'], weak: ['hydro', 'geo'] },
  hydro: { strong: ['pyro', 'electro'], weak: ['aero', 'void'] },
  electro: { strong: ['hydro', 'void'], weak: ['geo', 'spectro'] },
  geo: { strong: ['electro', 'pyro'], weak: ['spectro', 'aero'] },
  aero: { strong: ['geo', 'hydro'], weak: ['pyro', 'void'] },
  void: { strong: ['aero', 'hydro'], weak: ['electro', 'spectro'] },
  spectro: { strong: ['void', 'geo'], weak: ['electro', 'pyro'] }
};

export function initElements() {
  const grid = document.querySelector('.elements__grid');
  
  // Create element cards
  Object.entries(elements).forEach(([type, relations]) => {
    const card = createElementCard(type, relations);
    grid.appendChild(card);
  });
}

function createElementCard(type, relations) {
  const element = document.createElement('div');
  element.className = `element element--${type}`;
  element.innerHTML = `
    <h3>${type}</h3>
    <p>Strong: ${relations.strong.join(', ')}</p>
    <p>Weak: ${relations.weak.join(', ')}</p>
  `;
  return element;
}
