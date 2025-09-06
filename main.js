// Keep only core functionality
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

// Scroll animations
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
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