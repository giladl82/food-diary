const CACHE_NAME = "food-diary-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/site.webmanifest",
  "/favicon.ico",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/styles.css",
  "/main.js"
];

// Install and cache core assets
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate: clean up old caches if needed
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch event: .js/.css use stale-while-revalidate; others network-first with offline fallback
self.addEventListener("fetch", (event) => {
  const request = event.request;

  // Always try to serve cached .js and .css files (stale-while-revalidate)
  if (request.method === 'GET' && (request.url.endsWith('.js') || request.url.endsWith('.css'))) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        cache.match(request).then((cachedResponse) => {
          const fetchPromise = fetch(request)
            .then((networkResponse) => {
              cache.put(request, networkResponse.clone());
              return networkResponse;
            })
            .catch(() => cachedResponse); // if fetch fails, fallback to cache
          return cachedResponse || fetchPromise;
        })
      )
    );
    return;
  }

  // Default strategy: try network first, fallback to cache, then fallback to /index.html
  event.respondWith(
    fetch(request).catch(() =>
      caches.match(request).then((response) =>
        response || caches.match('/index.html') // optional fallback to root
      )
    )
  );
});