// Loading Handler
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.loading-overlay');
    
    // Ensure all content is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1000); // Show loader for at least 1 second
    });
});

// Mobile menu toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Reveal animations on scroll
const reveals = document.querySelectorAll('.reveal');

function reveal() {
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);
reveal(); // Initial check

// Parallax effect for hero section
const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
});

// Theme Switcher
const settingsToggle = document.querySelector('.settings-toggle');
const settingsPanel = document.querySelector('.settings-panel');
const themeOptions = document.querySelectorAll('.theme-option');

// Toggle settings panel
settingsToggle.addEventListener('click', () => {
    settingsPanel.classList.toggle('active');
});

// Theme switching
function setTheme(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem('theme', themeName);
    
    // Update active state of theme options
    themeOptions.forEach(option => {
        option.classList.toggle('active', option.dataset.theme === themeName);
    });
}

// Theme option click handlers
themeOptions.forEach(option => {
    option.addEventListener('click', () => {
        setTheme(option.dataset.theme);
    });
});

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

// GitHub Discussions Integration
async function fetchDiscussions() {
    const owner = 'tenstudiosbc';
    const repo = 'ssiavanguardchronicles';
    const query = `
    query {
        repository(owner: "${owner}", name: "${repo}") {
            discussions(first: 3, orderBy: {field: CREATED_AT, direction: DESC}) {
                nodes {
                    title
                    url
                    author {
                        login
                        avatarUrl
                    }
                    createdAt
                    body
                }
            }
        }
    }`;

    try {
        const response = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                'Authorization': `bearer ${atob('Z2hwX3lvdXJfZ2l0aHViX3Rva2VuX2hlcmU=')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query })
        });

        const data = await response.json();
        return data.data.repository.discussions.nodes;
    } catch (error) {
        console.error('Error fetching discussions:', error);
        return [];
    }
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

async function displayDiscussions() {
    if (!document.getElementById('posts').classList.contains('enabled')) {
        return;
    }
    const postsGrid = document.querySelector('.posts-grid');
    const postsLoading = document.querySelector('.posts-loading');

    try {
        const discussions = await fetchDiscussions();
        postsLoading.style.display = 'none';

        discussions.forEach(discussion => {
            const excerpt = discussion.body.split('\n')[0].substring(0, 150) + '...';
            
            const postCard = `
                <article class="post-card">
                    <h3>${discussion.title}</h3>
                    <div class="post-meta">
                        <img src="${discussion.author.avatarUrl}" alt="${discussion.author.login}">
                        <span>${discussion.author.login}</span>
                        <span>•</span>
                        <span>${formatDate(discussion.createdAt)}</span>
                    </div>
                    <p class="post-excerpt">${excerpt}</p>
                    <a href="${discussion.url}" class="post-link" target="_blank" rel="noopener noreferrer">
                        Read More →
                    </a>
                </article>
            `;
            
            postsGrid.insertAdjacentHTML('beforeend', postCard);
        });
    } catch (error) {
        postsLoading.innerHTML = '<p>Failed to load discussions. Please try again later.</p>';
    }
}

// Feature Toggle Management
function initializeFeatureToggles() {
    const postsToggle = document.getElementById('posts-toggle');
    const postsSection = document.getElementById('posts');
    
    // Load saved preference
    const postsEnabled = localStorage.getItem('postsEnabled') === 'true';
    postsToggle.checked = postsEnabled;
    postsSection.classList.toggle('enabled', postsEnabled);

    // Toggle handler
    postsToggle.addEventListener('change', (e) => {
        const isEnabled = e.target.checked;
        postsSection.classList.toggle('enabled', isEnabled);
        localStorage.setItem('postsEnabled', isEnabled);
        
        // Only fetch posts when enabled
        if (isEnabled && !postsSection.dataset.loaded) {
            displayDiscussions();
            postsSection.dataset.loaded = 'true';
        }
    });
}

// Elemental Chart Toggle
function initializeChartToggle() {
    const chartToggle = document.getElementById('chart-toggle');
    const chartSection = document.getElementById('elemental-chart');
    
    // Load saved preference
    const chartEnabled = localStorage.getItem('chartEnabled') === 'true';
    
    // Set initial state
    chartToggle.checked = chartEnabled;
    if (chartEnabled) {
        chartSection.classList.add('enabled');
        initializeElementalChart();
        initializeTeamBuilder();
    }

    // Toggle handler
    chartToggle.addEventListener('change', () => {
        const isEnabled = chartToggle.checked;
        chartSection.classList.toggle('enabled', isEnabled);
        localStorage.setItem('chartEnabled', isEnabled);
        
        if (isEnabled && !chartSection.dataset.initialized) {
            initializeElementalChart();
            initializeTeamBuilder();
            chartSection.dataset.initialized = 'true';
        }
    });
}

// Element interactions and team synergy
const elementData = {
    pyro: { strong: ['aero', 'spectro'], weak: ['hydro', 'geo'] },
    hydro: { strong: ['pyro', 'electro'], weak: ['aero', 'void'] },
    electro: { strong: ['hydro', 'void'], weak: ['geo', 'spectro'] },
    geo: { strong: ['electro', 'pyro'], weak: ['spectro', 'aero'] },
    aero: { strong: ['geo', 'hydro'], weak: ['pyro', 'void'] },
    void: { strong: ['aero', 'hydro'], weak: ['electro', 'spectro'] },
    spectro: { strong: ['void', 'geo'], weak: ['electro', 'pyro'] }
};

function initializeElementalChart() {
    const elements = document.querySelectorAll('.element');
    
    elements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            const elementType = element.classList[1];
            highlightInteractions(elementType);
        });
        
        element.addEventListener('mouseleave', () => {
            resetHighlights();
        });
    });
}

function highlightInteractions(elementType) {
    const data = elementData[elementType];
    data.strong.forEach(type => {
        document.querySelector(`.${type}`).classList.add('advantaged');
    });
    data.weak.forEach(type => {
        document.querySelector(`.${type}`).classList.add('disadvantaged');
    });
}

function resetHighlights() {
    document.querySelectorAll('.element').forEach(element => {
        element.classList.remove('advantaged', 'disadvantaged');
    });
}

// Team Builder functionality
function initializeTeamBuilder() {
    const teamSlots = document.querySelectorAll('.team-slot');
    const characters = document.querySelectorAll('.character-option');
    
    let currentTeam = new Array(4).fill(null);

    characters.forEach(char => {
        char.addEventListener('click', () => {
            const emptySlot = Array.from(teamSlots).find(slot => !slot.dataset.character);
            if (emptySlot) {
                addToTeam(char.dataset.character, char.dataset.element, emptySlot);
                updateTeamSynergy();
            }
        });
    });

    teamSlots.forEach(slot => {
        slot.addEventListener('click', () => {
            if (slot.dataset.character) {
                removeFromTeam(slot);
                updateTeamSynergy();
            }
        });
    });
}

function addToTeam(character, element, slot) {
    slot.dataset.character = character;
    slot.dataset.element = element;
    slot.innerHTML = `
        <div class="team-member ${element}">
            <span>${character}</span>
            <small>${element}</small>
        </div>
    `;
}

function removeFromTeam(slot) {
    slot.dataset.character = '';
    slot.dataset.element = '';
    slot.innerHTML = '<div class="empty-slot">+</div>';
}

function updateTeamSynergy() {
    const teamSlots = document.querySelectorAll('.team-slot');
    const elements = Array.from(teamSlots)
        .map(slot => slot.dataset.element)
        .filter(Boolean);
    
    const synergies = calculateTeamSynergy(elements);
    displaySynergies(synergies);
}

function calculateTeamSynergy(elements) {
    let synergies = [];
    
    // Check for elemental resonance
    const elementCounts = elements.reduce((acc, elem) => {
        acc[elem] = (acc[elem] || 0) + 1;
        return acc;
    }, {});

    // Add resonance bonuses
    Object.entries(elementCounts).forEach(([element, count]) => {
        if (count >= 2) {
            synergies.push(`${element.charAt(0).toUpperCase() + element.slice(1)} Resonance`);
        }
    });

    // Check for special combinations
    if (elements.includes('hydro') && elements.includes('electro')) {
        synergies.push('Electro-Charged');
    }
    if (elements.includes('pyro') && elements.includes('hydro')) {
        synergies.push('Vaporize');
    }
    // Add more combinations as needed

    return synergies;
}

function displaySynergies(synergies) {
    const synergyDisplay = document.querySelector('.team-synergy');
    if (synergies.length) {
        synergyDisplay.innerHTML = `
            <h4>Team Synergies:</h4>
            <ul>${synergies.map(s => `<li>${s}</li>`).join('')}</ul>
        `;
    } else {
        synergyDisplay.innerHTML = '<p>No active synergies</p>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initializeFeatureToggles();
    initializeChartToggle();
});

// Initialize discussions when DOM is loaded
document.addEventListener('DOMContentLoaded', displayDiscussions);

// Posts Management
async function loadPosts() {
    const postsGrid = document.getElementById('posts-grid');
    
    try {
        const response = await fetch('/_posts/index.json');
        const posts = await response.json();
        
        posts.slice(0, 3).forEach(post => {
            const postCard = `
                <article class="post-card">
                    ${post.thumbnail ? `<img src="${post.thumbnail}" alt="${post.title}">` : ''}
                    <div class="post-content">
                        <h3>${post.title}</h3>
                        <div class="post-meta">
                            <span>${post.author}</span>
                            <span>•</span>
                            <span>${new Date(post.date).toLocaleDateString()}</span>
                        </div>
                        <div class="post-excerpt">
                            ${post.excerpt || post.body.substring(0, 150)}...
                        </div>
                        <a href="${post.url}" class="post-link">Read More →</a>
                    </div>
                </article>
            `;
            postsGrid.insertAdjacentHTML('beforeend', postCard);
        });
    } catch (error) {
        console.error('Error loading posts:', error);
        postsGrid.innerHTML = '<p>Failed to load updates. Please try again later.</p>';
    }
}

// Initialize Netlify Identity
if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", user => {
        if (!user) {
            window.netlifyIdentity.on("login", () => {
                document.location.href = "/admin/";
            });
        }
    });
}