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

document.addEventListener('DOMContentLoaded', () => {
    // ...existing code...
    initializeFeatureToggles();
});

// Initialize discussions when DOM is loaded
document.addEventListener('DOMContentLoaded', displayDiscussions);