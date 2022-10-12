self.importScripts("./swFiles.js");

const cacheName = "pino-v1";

self.addEventListener("install", (e) => {
  console.log("[Service Worker] Install");
  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      console.log("[Service Worker] Caching all: app shell and content");
      await cache.addAll(filesList);
    })()
  );
});

// Fetching content using Service Worker
self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
            try {
        console.log(
          `[Service Worker] Fetching resource from web: ${e.request.url}`
        );
        const response = await fetch(e.request);
        console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
        const cache = await caches.open(cacheName);
        cache.put(e.request, response.clone());
        return response;
      } catch (error) {
        console.log(
          `[Service Worker] Fetching resource from cache: ${e.request.url}`
        );
        return await caches.match(e.request);
      }
    })()
  );
});
