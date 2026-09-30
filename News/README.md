# News folder publishing

The homepage reads `News/index.json`, then fetches and displays every listed HTML fragment.

When adding/removing articles, regenerate `News/index.json` from the HTML files in `News/` (excluding `index.html`). A browser cannot reliably enumerate a server folder on static hosting, so the manifest is the portable automatic-discovery method.

Each news file should contain an HTML fragment (for example an `<article class="news-article">...</article>`), not a full document with `<html>`, `<head>`, and `<body>` wrappers.

Serve the site over HTTP(S); `fetch()` is commonly blocked when opening `index.html` via `file://`.
