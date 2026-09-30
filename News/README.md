# Publishing News on GitHub Pages

`index.json` is the authoritative list of published news HTML files. GitHub Pages is static hosting and does not provide a dependable directory listing, so the homepage must not try to scan `News/` itself.

## Publish an article

1. Create a fragment such as `News/update-004.html`.
2. Use the shared article classes so the site's `Styles/styles.css` applies:
   - `.news-article`
   - `.news-article-tag`
   - `.news-article-meta`
3. Add the exact filename to `News/index.json`.
4. Commit and push both files. Once GitHub Pages deploys, the homepage fetches the manifest and each article.

Example manifest:

```json
[
  "platform-unification.html",
  "update-004.html"
]
```

Keep this valid JSON: use double quotes, commas between entries, and no trailing comma. Filenames should use letters, numbers, hyphens, and underscores, ending in `.html`. Do not list `index.html`.

## Article template

```html
<article class="news-article">
  <div class="news-article-tag">Game Update</div>
  <h3>Update Title</h3>
  <p>Write your announcement here.</p>
  <div class="news-article-meta">2026-09-30 <span>•</span> SSIA Command</div>
</article>
```

Use HTML fragments, not a full page with `<html>`, `<head>`, and `<body>`. The loader inserts the fragment into `#news-container`; CSS is inherited from the homepage.

## Notes

- Use relative paths (`News/...`) so root and GitHub project-page deployments can resolve the files from the site base.
- The loader ignores invalid filenames, skips individual articles that fail to load, and shows a useful empty/error message.
- Publish over GitHub Pages HTTPS; `fetch()` will not reliably work when opening `index.html` directly using `file://`.
- Only publish trusted HTML you control. HTML inserted into the page can include active markup.


## Permalinks and sharing

Each article should have a unique `id` and matching `data-news-slug`, for example `news-lan-multiplayer-112`. The homepage loader adds an **Open update** link and a **Share** button to each article. The permalink uses the homepage URL plus that article's hash, so opening it loads the news list and jumps to the selected update. Share uses the device share sheet when available, otherwise it copies the link or offers a copy prompt.
