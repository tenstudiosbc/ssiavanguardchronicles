/* Automatically discovers HTML files in News/ and renders them on index.html.
   Requires HTTP(S): directory listing is not available on many static hosts, so
   News/index.json is the portable manifest fallback. */
(async () => {
  const container = document.getElementById("news-container");
  if (!container) return;

  const safeName = (name) => typeof name === "string" &&
    /^[a-zA-Z0-9_-]+\\.html$/.test(name) && name.toLowerCase() !== "index.html";

  try {
    // Prefer the auto-generated manifest. Keep it current when adding/removing articles.
    const response = await fetch("News/index.json", { cache: "no-cache" });
    if (!response.ok) throw new Error("News manifest unavailable");
    const files = await response.json();
    if (!Array.isArray(files)) throw new Error("News manifest must be an array");

    const articles = await Promise.all(files.filter(safeName).map(async (file) => {
      const r = await fetch(`News/${encodeURIComponent(file)}`);
      if (!r.ok) return "";
      return await r.text();
    }));
    const valid = articles.filter(Boolean);
    container.innerHTML = valid.length ? valid.join("\\n") :
      '<p class="news-loading">No news articles have been published yet.</p>';
  } catch (error) {
    console.error("News loader:", error);
    container.innerHTML = '<p class="news-loading">News could not be loaded. Check that News/index.json is available and the site is served over HTTP(S).</p>';
  }
})();
