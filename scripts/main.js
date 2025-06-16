// Modern JS with better organization and error handling
const App = {
  init() {
    this.attachEventListeners();
    this.setupIntersectionObserver();
    this.setupNavigation();
  },

  attachEventListeners() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', this.handleSmoothScroll);
    });

    window.addEventListener('scroll', this.handleScroll);
  },

  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '50px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate').forEach(el => observer.observe(el));
  },

  handleSmoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  },

  setupNavigation() {
    const nav = {
      header: document.querySelector('.header'),
      hamburger: document.querySelector('.hamburger'),
      menu: document.querySelector('.nav-menu'),
      lastScroll: 0
    };

    if (nav.hamburger && nav.menu) {
      nav.hamburger.addEventListener('click', () => this.toggleMenu(nav));
      document.addEventListener('click', (e) => this.handleClickOutside(e, nav));
    }
  },

  toggleMenu(nav) {
    nav.hamburger.classList.toggle('active');
    nav.menu.classList.toggle('active');
  },

  handleClickOutside(e, nav) {
    if (!e.target.closest('.nav')) {
      nav.hamburger?.classList.remove('active');
      nav.menu?.classList.remove('active');
    }
  }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => App.init());
document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav')) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  }
});

// Intersection Observer for animations
const observerCallback = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
};

const observer = new IntersectionObserver(observerCallback, {
  threshold: 0.1
});

document.querySelectorAll('.animate').forEach(el => observer.observe(el));

// Lazy loading images
document.querySelectorAll('img[data-src]').forEach(img => {
  img.setAttribute('src', img.getAttribute('data-src'));
  img.onload = () => {
    img.removeAttribute('data-src');
  };
});
