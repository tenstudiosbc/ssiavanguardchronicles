/* ─── PARTICLE CANVAS ─── */
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let W, H, particles = [];

function resizeCanvas() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

class Particle {
  constructor() {
    this.reset(true);
  }

  reset(init) {
    this.x = Math.random() * W;
    this.y = init ? Math.random() * H : H + 10;
    this.size = Math.random() * 1.2 + 0.2;
    this.speed = Math.random() * 0.4 + 0.1;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.drift = (Math.random() - 0.5) * 0.2;
  }

  update() {
    this.y -= this.speed;
    this.x += this.drift;
    if (this.y < -10) this.reset(false);
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0,245,212,${this.opacity})`;
    ctx.fill();
  }
}

function initParticles() {
  particles = Array.from({ length: 80 }, () => new Particle());
}

function drawGrid() {
  ctx.strokeStyle = 'rgba(0,245,212,0.025)';
  ctx.lineWidth = 0.5;
  const gs = 60;
  for (let x = 0; x < W; x += gs) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
  for (let y = 0; y < H; y += gs) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }
}

function drawGlow() {
  const grad = ctx.createRadialGradient(W / 2, 0, 0, W / 2, 0, H * 0.7);
  grad.addColorStop(0, 'rgba(0,60,80,0.18)');
  grad.addColorStop(1, 'transparent');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);
}

function animate() {
  ctx.clearRect(0, 0, W, H);
  drawGlow();
  drawGrid();
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
  resizeCanvas();
  initParticles();
});

resizeCanvas();
initParticles();
animate();

/* ─── TOAST NOTIFICATIONS ─── */
function showToast(message) {
  const toaster = document.getElementById('toaster');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerText = `> ${message}`;
  toaster.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(20px)';
    toast.style.transition = '0.4s ease';
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

document.addEventListener('charactersLoaded', (e) => {
  showToast(`Agent synced: ${e.detail.name}`);
  // Update hero stat
  const cards = document.querySelectorAll('.character-card');
  const el = document.getElementById('agent-count');
  if (el) el.textContent = cards.length;
});

document.addEventListener('bannerLoaded', (e) => {
  showToast(`Event active: ${e.detail.title}`);
  const el = document.getElementById('event-count');
  if (el) {
    const count = document.querySelectorAll('.banner-card').length;
    el.textContent = count;
  }
});

document.addEventListener('toast', (e) => showToast(e.detail));

/* Update hero counts after DOM settles */
setTimeout(() => {
  const agentEl = document.getElementById('agent-count');
  const eventEl = document.getElementById('event-count');
  const cards = document.querySelectorAll('.character-card');
  const banners = document.querySelectorAll('.banner-card');
  if (agentEl && cards.length) agentEl.textContent = cards.length;
  if (eventEl && banners.length) eventEl.textContent = banners.length;
}, 1500);

/* ─── SEARCH FUNCTIONALITY ─── */
function filterCharacters() {
  const filter = document.getElementById('character-search').value.toUpperCase();
  document.querySelectorAll('.character-card').forEach((card) => {
    const name = card.querySelector('h2')?.textContent || '';
    card.style.display = name.toUpperCase().includes(filter) ? '' : 'none';
  });
}

/* ─── SCROLL REVEAL ─── */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

/* ─── HAMBURGER MENU ─── */
function initHamburgerMenu() {
  const hamburgerMenu = document.getElementById('hamburger-menu');
  const navLinks = document.getElementById('nav-links');

  if (!hamburgerMenu || !navLinks) {
    console.warn('[Hamburger Menu] Elements not found');
    return false;
  }

  console.log('[Hamburger Menu] Initializing...');

  // Remove any existing listeners by cloning and replacing (to avoid duplicates on dynamic loads)
  const newHamburgerMenu = hamburgerMenu.cloneNode(true);
  hamburgerMenu.parentNode.replaceChild(newHamburgerMenu, hamburgerMenu);
  const hamburgerMenuElement = document.getElementById('hamburger-menu');

  // Toggle menu on hamburger button click
  hamburgerMenuElement.addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();
    hamburgerMenuElement.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      hamburgerMenuElement.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    const isClickInsideNav = e.target.closest('nav');
    if (!isClickInsideNav && navLinks.classList.contains('active')) {
      hamburgerMenuElement.classList.remove('active');
      navLinks.classList.remove('active');
    }
  });

  // Close menu on window resize (if resizing back to desktop view)
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      hamburgerMenuElement.classList.remove('active');
      navLinks.classList.remove('active');
    }
  });

  console.log('[Hamburger Menu] Initialized successfully');
  return true;
}

// Listen for navbar component being loaded (works for initial load and dynamic reloads)
document.addEventListener('componentLoaded', (e) => {
  if (e.detail.component === 'navbar') {
    console.log('[Hamburger Menu] Navbar loaded, initializing hamburger menu...');
    // Use setTimeout to ensure DOM is updated
    setTimeout(initHamburgerMenu, 100);
  }
});

// Fallback: Also try to initialize immediately if navbar already exists
if (document.getElementById('hamburger-menu')) {
  setTimeout(initHamburgerMenu, 100);
}