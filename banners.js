const banners = [
  {
    title: "Vixen Temptress",
    duration: "Feb 3 – Mar 30, 2025",
    extended: "N/a",
    image: "https://i.supaimg.com/d0616997-0bed-4319-ab3e-cd6a433794e9/9180bf62-25b2-429f-bd9c-e1405c3d3d82.png",
    featured5Star: ["Kenziet Felicia-Harrison"],
    featured4Star: ["Lucia Hoenigsmen", "Nexon Dyke Martinez", "Rogershin A Ventere"],
    weapons: ["Red Katana"],
    pool: ["Featured 5★ pool", "Standard 4★ pool"]
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
      <p><strong>Extended:</strong> ${banner.extended}</p>
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
