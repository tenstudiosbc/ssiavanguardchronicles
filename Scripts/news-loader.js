/* Static-hosting news loader with stable article permalinks and share actions. */
(async function loadVanguardNews() {
  "use strict";
  const container = document.getElementById("news-container");
  if (!container) return;

  const manifestUrl = new URL("News/index.json", document.baseURI);
  const isArticleFile = (name) =>
    typeof name === "string" &&
    /^[a-z0-9][a-z0-9_-]*\\.html$/i.test(name) &&
    name.toLowerCase() !== "index.html";

  const permalinkFor = (article) => {
    const slug = article.dataset.newsSlug || article.id;
    return slug ? new URL("#" + encodeURIComponent(slug), document.baseURI).href : document.baseURI;
  };

  function addArticleActions(article) {
    if (!article.id) {
      const slug = article.dataset.newsSlug;
      if (slug) article.id = slug;
    }
    if (article.querySelector(".news-article-actions")) return;

    const actions = document.createElement("div");
    actions.className = "news-article-actions";

    const open = document.createElement("a");
    open.className = "news-open-link";
    open.href = "#" + encodeURIComponent(article.id);
    open.textContent = "Open update";
    open.setAttribute("aria-label", "Open " + (article.dataset.newsTitle || "news update"));

    const share = document.createElement("button");
    share.className = "news-share-button";
    share.type = "button";
    share.textContent = "Share";
    share.setAttribute("aria-label", "Share " + (article.dataset.newsTitle || "news update"));
    share.addEventListener("click", async () => {
      const url = permalinkFor(article);
      const title = article.dataset.newsTitle || article.querySelector("h3")?.textContent || "SSIA: Vanguard Chronicles";
      try {
        if (navigator.share) {
          await navigator.share({ title, url });
        } else if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(url);
          share.textContent = "Link copied";
          window.setTimeout(() => { share.textContent = "Share"; }, 1800);
        } else {
          window.prompt("Copy this news link:", url);
        }
      } catch (error) {
        if (error && error.name !== "AbortError") {
          window.prompt("Copy this news link:", url);
        }
      }
    });

    actions.append(open, share);
    article.appendChild(actions);
  }

  container.setAttribute("aria-busy", "true");
  container.innerHTML = '<p class="news-loading">Retrieving latest dispatches...</p>';

  try {
    const manifestResponse = await fetch(manifestUrl.href, { cache: "no-cache" });
    if (!manifestResponse.ok) throw new Error(`Manifest request failed (${manifestResponse.status})`);
    const manifest = await manifestResponse.json();
    if (!Array.isArray(manifest)) throw new Error("News/index.json must be a JSON array of HTML filenames.");

    const files = [...new Set(manifest.filter(isArticleFile))];
    if (!files.length) {
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
        const nodes = [...parsed.body.children];
        if (!nodes.length) return { file, html: "" };
        return { file, html: nodes.map(node => node.outerHTML).join("\\n") };
      } catch (error) {
        console.warn(`News article skipped: ${file}`, error);
        return { file, html: "" };
      }
    }));

    const rendered = results.filter(item => item.html.trim()).map(item => item.html);
    if (rendered.length) {
      container.innerHTML = rendered.join("\\n");
      container.querySelectorAll(".news-article").forEach(addArticleActions);
      const hash = decodeURIComponent(window.location.hash.slice(1));
      if (hash) {
        const target = document.getElementById(hash);
        if (target && container.contains(target)) target.scrollIntoView({ behavior: "auto", block: "start" });
      }
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
