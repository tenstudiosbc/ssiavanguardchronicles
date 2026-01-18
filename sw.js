const CACHE_NAME = 'ssia-vanguard-v1.0.0.2';
const ASSETS = [
  '/ssiavanguardchronicles/',
  '/ssiavanguardchronicles/index.html',
  '/ssiavanguardchronicles/character.js',
  '/ssiavanguardchronicles/banners.js',
  '/ssiavanguardchronicles/20241228_080318.png',
  'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700&family=JetBrains+Mono:wght@400;700&display=swap'
];

// 1. Install Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// 2. Activate and clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// 3. Fetching strategy: Cache First, then Network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});

// --- NEW: PERIODIC BACKGROUND SYNC ---

// 4. Handle the background update
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'update-game-data') {
    console.log('[SW] Periodic Sync: Fetching new character/banner data...');
    event.waitUntil(updateGameAssets());
  }
});

async function updateGameAssets() {
  const cache = await caches.open(CACHE_NAME);
  // We only re-fetch files that change often (characters and banners)
  const filesToUpdate = [
    '/ssiavanguardchronicles/character.js',
    '/ssiavanguardchronicles/banners.js'
  ];
  
  try {
    await cache.addAll(filesToUpdate);
    console.log('[SW] Game assets updated successfully in background.');
  } catch (err) {
    console.error('[SW] Periodic Sync failed:', err);
  }
}
