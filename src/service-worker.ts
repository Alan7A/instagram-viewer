/// <reference types="vite/client" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

const sw = /** @type {ServiceWorkerGlobalScope} */ /** @type {unknown} */ self;

import { build, files, version } from "$service-worker";

const ASSETS = `assets_${version}`;
const CACHE = `cache_${version}`;
const OFFLINE_CACHE = "offline_cache";

const staticAssets = [
  ...build, // the app itself
  ...files // everything in `static`
];

sw.addEventListener("install", event => {
  // Create a new cache and add all static assets to it
  event.waitUntil(
    caches.open(ASSETS).then(cache => cache.addAll(staticAssets))
  );
});

sw.addEventListener("activate", event => {
  // Remove previous cached assets
  event.waitUntil(
    caches.keys().then(async keys => {
      for (const key of keys) {
        if (key !== ASSETS && key !== CACHE) await caches.delete(key);
      }
    })
  );
});

sw.addEventListener("fetch", event => {
  // Ignore non-GET requests
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      // Return cached response if available
      if (cachedResponse) return cachedResponse;

      // Otherwise fetch from network
      return fetch(event.request).then(response => {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        // Clone the response
        const responseToCache = response.clone();

        // Open the cache and put the new response
        caches.open(CACHE).then(cache => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});
