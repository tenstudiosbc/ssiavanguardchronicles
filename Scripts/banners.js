const banners = [
  {
    title: "Justice Will Prevail Phase 2",
    duration: "Mar 3 – Jun 1, 2026",
    extended: "N/a",
    image: "https://i.supaimg.com/b3da42ad-02aa-4f1a-b499-acc775586122/ff9f5f07-969e-46af-b55c-598ca53af100.png",
    featured5Star: ["Jones Harrison"],
    featured4Star: ["Lucia Hoenigsmen", "Nexon Dyke Martinez"],
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
