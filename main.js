// Responsive Navbar Toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const header = document.querySelector("header");

  // Handle navigation toggle
  toggleButton?.addEventListener("click", (e) => {
    e.stopPropagation();
    navLinks.classList.toggle("show");
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!header.contains(e.target)) {
      navLinks.classList.remove("show");
    }
  });

  // Add scroll padding for fixed header
  document.documentElement.style.setProperty(
    '--scroll-padding',
    header.offsetHeight + 'px'
  );

  // Handle smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerOffset = header.offsetHeight;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollBy({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        navLinks.classList.remove("show");
      }
    });
  });
});

// Scroll-Reveal Animation
window.addEventListener("scroll", revealElements);

function revealElements() {
  const reveals = document.querySelectorAll(".reveal");
  reveals.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 150;

    if (elementTop < windowHeight - revealPoint) {
      el.classList.add("active");
    }
  });
}

revealElements(); // Trigger once on page load