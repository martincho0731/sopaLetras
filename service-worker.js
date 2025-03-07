const CACHE_NAME = "sopa-cache-v1";
const URLS_TO_CACHE = [
  "./index.html",
  "./manifest.json",
  // Si tienes style.css o iconos, agrégalos aquí
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
