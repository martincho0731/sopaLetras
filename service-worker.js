const CACHE_NAME = "sopa-letras-v1";
const URLS_A_CACHEAR = [
  "./index.html",
  "./style.css",
  "./manifest.json",
  "./service-worker.js",
  "./sopa_letras.js", 
  // Agrega más archivos si lo deseas (iconos, etc.)
];

// Evento de instalación: caché inicial
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_A_CACHEAR);
    })
  );
});

// Evento de fetch: servir desde caché si está disponible
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((respuestaCache) => {
      // Si está en caché, lo devuelve, si no, lo pide a la red
      return respuestaCache || fetch(e.request);
    })
  );
});
