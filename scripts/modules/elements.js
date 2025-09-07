const ELEMENTS = {
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
  if (!grid) return;

  Object.entries(ELEMENTS).forEach(([type, relations]) => {
    const element = createElementCard(type, relations);
    grid.appendChild(element);
  });
}

function createElementCard(type, relations) {
  const element = document.createElement('div');
  element.className = `element element--${type}`;
  element.innerHTML = `
    <h3>${type}</h3>
    <p>Strong against: ${relations.strong.join(', ')}</p>
    <p>Weak against: ${relations.weak.join(', ')}</p>
  `;
  return element;
}
