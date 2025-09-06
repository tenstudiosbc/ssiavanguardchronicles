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

// Discussions functionality
async function fetchGitHubDiscussions() {
    const query = `
    query {
        repository(owner: "${config.REPO_OWNER}", name: "${config.REPO_NAME}") {
            discussions(first: 6, orderBy: {field: CREATED_AT, direction: DESC}) {
                nodes {
                    id
                    title
                    url
                    author {
                        login
                        avatarUrl
                    }
                    createdAt
                    body
                    category {
                        name
                    }
                }
            }
        }
    }`;

    try {
        const response = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                'Authorization': `bearer ${config.GITHUB_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query })
        });

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const data = await response.json();
        if (data.errors) {
            throw new Error(data.errors[0].message);
        }

        return data.data.repository.discussions.nodes;
    } catch (error) {
        console.error('Error fetching discussions:', error);
        return [];
    }
}

function displayDiscussions() {
    const discussionsGrid = document.querySelector('.discussions-grid');
    const loadingElement = document.querySelector('.discussions-loading');

    fetchGitHubDiscussions().then(discussions => {
        loadingElement.style.display = 'none';
        
        if (discussions.length === 0) {
            discussionsGrid.innerHTML = '<p class="no-discussions">No discussions found. Be the first to start one!</p>';
            return;
        }

        discussionsGrid.innerHTML = discussions.map(discussion => `
            <a href="${discussion.url}" class="discussion-card" target="_blank" rel="noopener noreferrer">
                <h3 class="discussion-title">${discussion.title}</h3>
                <div class="discussion-meta">
                    <img src="${discussion.author.avatarUrl}" alt="${discussion.author.login}">
                    <span>${discussion.author.login}</span>
                    <span>•</span>
                    <span>${new Date(discussion.createdAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>${discussion.category.name}</span>
                </div>
                <p class="discussion-preview">${discussion.body.substring(0, 150)}...</p>
            </a>
        `).join('');
    }).catch(error => {
        loadingElement.innerHTML = '<p>Failed to load discussions. Please try again later.</p>';
    });
}

// Initialize discussions toggle
function initializeDiscussionsToggle() {
    const discussionsToggle = document.getElementById('discussions-toggle');
    const discussionsSection = document.getElementById('discussions');
    
    // Load saved preference
    const discussionsEnabled = localStorage.getItem('discussionsEnabled') === 'true';
    discussionsToggle.checked = discussionsEnabled;
    discussionsSection.classList.toggle('enabled', discussionsEnabled);
    
    if (discussionsEnabled && !discussionsSection.dataset.loaded) {
        displayDiscussions();
        discussionsSection.dataset.loaded = 'true';
    }

    // Toggle handler
    discussionsToggle.addEventListener('change', (e) => {
        const isEnabled = e.target.checked;
        discussionsSection.classList.toggle('enabled', isEnabled);
        localStorage.setItem('discussionsEnabled', isEnabled);
        
        if (isEnabled && !discussionsSection.dataset.loaded) {
            displayDiscussions();
            discussionsSection.dataset.loaded = 'true';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initializeFeatureToggles();
    initializeChartToggle();
    initializeDiscussionsToggle();
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

// Experimental Features Management
const GITHUB_TOKEN = 'YOUR_GITHUB_TOKEN'; // Replace with your actual token
const REPO_OWNER = 'tenstudiosbc';
const REPO_NAME = 'ssiavanguardchronicles';

class ExperimentalFeature {
    constructor(id, section) {
        this.id = id;
        this.section = document.getElementById(section);
        this.toggle = document.getElementById(`${id}-toggle`);
        this.isEnabled = localStorage.getItem(`${id}Enabled`) === 'true';
        this.isInitialized = false;
    }

    init() {
        if (!this.toggle || !this.section) return;

        // Set initial state
        this.toggle.checked = this.isEnabled;
        
        // Initial display
        requestAnimationFrame(() => {
            this.section.style.display = this.isEnabled ? 'block' : 'none';
            if (this.isEnabled) {
                this.onEnable();
            }
        });

        // Toggle handler
        this.toggle.addEventListener('change', () => {
            this.isEnabled = this.toggle.checked;
            
            if (this.isEnabled) {
                this.section.style.display = 'block';
                // Force reflow
                this.section.offsetHeight;
                this.onEnable();
            } else {
                this.section.style.display = 'none';
            }
            
            localStorage.setItem(`${this.id}Enabled`, this.isEnabled);
        });
    }

    onEnable() {
        if (this.isInitialized) return;
        this.isInitialized = true;
    }
}

class ChartFeature extends ExperimentalFeature {
    constructor() {
        super('chart', 'elemental-chart');
    }

    onEnable() {
        initializeElementalChart();
        initializeTeamBuilder();
    }
}

class DiscussionsFeature extends ExperimentalFeature {
    constructor() {
        super('discussions', 'discussions');
    }

    onEnable() {
        if (!this.section.dataset.loaded) {
            displayDiscussions();
            this.section.dataset.loaded = 'true';
        }
    }
}

// Update initialization
document.addEventListener('DOMContentLoaded', () => {
    const features = [
        new ChartFeature(),
        new DiscussionsFeature()
    ];

    // Initialize features after a small delay to ensure smooth transitions
    setTimeout(() => {
        features.forEach(feature => feature.init());
    }, 100);
});

// Remove old initialization code