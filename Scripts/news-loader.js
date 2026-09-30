/* GitHub Pages News loader
   Static hosting has no dependable directory listing: News/index.json is authoritative.
   Paths are relative to the site root so this also works on project pages.
*/
(async function loadVanguardNews() {
  "use strict";
  const container = document.getElementById("news-container");
  if (!container) return;

  const manifestUrl = new URL("News/index.json", document.baseURI);
  const isArticleFile = (name) =>
    typeof name === "string" &&
    /^[a-z0-9][a-z0-9_-]*\.html$/i.test(name) &&
    name.toLowerCase() !== "index.html";

  container.setAttribute("aria-busy", "true");
  container.innerHTML = '<p class="news-loading">Retrieving latest dispatches...</p>';

  try {
    const manifestResponse = await fetch(manifestUrl.href, { cache: "no-cache" });
    if (!manifestResponse.ok) {
      throw new Error(`Manifest request failed (${manifestResponse.status})`);
    }

    const manifest = await manifestResponse.json();
    if (!Array.isArray(manifest)) {
      throw new Error("News/index.json must be a JSON array of HTML filenames.");
    }

    const files = [...new Set(manifest.filter(isArticleFile))];
    if (files.length === 0) {
      container.innerHTML = '<p class="news-loading">No news articles have been published yet.</p>';
      return;
    }

    const results = await Promise.all(files.map(async (file) => {
      const articleUrl = new URL(`News/${encodeURIComponent(file)}`, document.baseURI);
      try {
        const response = await fetch(articleUrl.href, { cache: "no-cache" });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const source = await response.text();
        const parsed = new DOMParser().parseFromString(source, "text/html");

        // Accept a single fragment or multiple top-level article elements.
        const nodes = [...parsed.body.children];
        if (!nodes.length) return { file, html: "" };
        return { file, html: nodes.map(node => node.outerHTML).join("\n") };
      } catch (error) {
        console.warn(`News article skipped: ${file}`, error);
        return { file, html: "" };
      }
    }));

    const rendered = results.filter(item => item.html.trim()).map(item => item.html);
    if (rendered.length) {
      container.innerHTML = rendered.join("\n");
    } else {
      container.innerHTML = '<p class="news-loading">News is temporarily unavailable. Please check back soon.</p>';
    }
  } catch (error) {
    console.error("Vanguard News:", error);
    container.innerHTML = '<p class="news-loading">News could not be loaded. Please try again later.</p>';
  } finally {
    container.removeAttribute("aria-busy");
  }
})();
