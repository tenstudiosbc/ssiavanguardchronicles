document.getElementById("exploreBtn").addEventListener("click", () => {
  alert("Welcome to the SSIA Universe! Start your journey soon.");
});

const newsList = document.getElementById("newsList");

const newsItems = [
  "Game Will Be Released at 17th August 2025"
];

newsItems.forEach(item => {
  const li = document.createElement("li");
  li.textContent = item;
  newsList.appendChild(li);
});