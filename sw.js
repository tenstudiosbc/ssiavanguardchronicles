const CACHE_NAME = 'ssia-vanguard-v1.0.0.3';
const ASSETS = [
  '/ssiavanguardchronicles/',
  '/ssiavanguardchronicles/index.html',
  '/ssiavanguardchronicles/character.js',
  '/ssiavanguardchronicles/banners.js',
  '/ssiavanguardchronicles/20241228_080318.png',
  'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700&family=JetBrains+Mono:wght@400;700&display=swap'
];

// Install Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Activate and clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// Fetching strategy: Cache First, then Network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});

// PERIODIC SYNC: Background data updates
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'update-game-data') {
    event.waitUntil(updateCache());
  }
});

async function updateCache() {
  const cache = await caches.open(CACHE_NAME);
  // Re-fetch character and banner data in background
  try {
    await cache.add('/ssiavanguardchronicles/character.js');
    await cache.add('/ssiavanguardchronicles/banners.js');
    console.log('[SW]: Periodic Data Update Successful');
  } catch (error) {
    console.error('[SW]: Periodic Data Update Failed', error);
  }
}
