const CACHE_NAME = "acertos-club-cache-v1";
const urlsToCache = [
  "/",
  "/teste.html",
  "/favicon.ico",
  "/icon-192.png",
  "/icon-512.png",
  "/styles.css", // Substitua pelos seus arquivos de estilo reais
  "/scripts.js"  // Substitua pelos seus arquivos de script reais
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Abrindo cache...");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Retorna o recurso do cache, se disponível, ou faz uma solicitação de rede
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log("Removendo cache antigo:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
