const banners = [
  {
    title: "Timidity In Purity",
    duration: "Aug 17 – Sept 30, 2025",
    image: "https://example.com/banner1.jpg",
    featured5Star: ["Hannabi Ingrid Stephanie"],
    featured4Star: ["Margaret Stephanie", "Nexon Dyke Martinez", "Rogershin A Ventere"],
    weapons: ["Blue Sword", "White Polearm"],
    pool: ["Standard 5★ pool", "Event 4★ pool"]
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const bannerContainer = document.getElementById("banners-container");
  if (!bannerContainer) return;

  banners.forEach(banner => {
    const card = document.createElement("div");
    card.className = "banner-card";
    card.innerHTML = `
      <img src="${banner.image}" alt="${banner.title}">
      <h3>${banner.title}</h3>
      <p><strong>Duration:</strong> ${banner.duration}</p>
      <p><strong>Featured 5★:</strong> ${banner.featured5Star.join(", ")}</p>
      <p><strong>Featured 4★:</strong> ${banner.featured4Star.join(", ")}</p>
      <p><strong>Weapons:</strong> ${banner.weapons.join(", ")}</p>
      <p><strong>Pool:</strong> ${banner.pool.join(", ")}</p>
    `;
    bannerContainer.appendChild(card);

    // Trigger event for toast
    document.dispatchEvent(new CustomEvent("bannerLoaded", { detail: { title: banner.title } }));
  });
});
