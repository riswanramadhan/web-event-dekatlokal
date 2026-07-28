const CACHE_NAME = "dekatevent-static-v2";
const OFFLINE_SOURCE_URL = "/offline.html";
const OFFLINE_CACHE_KEY = "/offline";
const STATIC_ASSETS = [
  "/dekatlokal-mark.png",
  "/icons/dekatevent-192.png",
  "/icons/dekatevent-512.png",
];

async function cacheOfflinePage(cache) {
  const response = await fetch(OFFLINE_SOURCE_URL, { cache: "reload" });

  if (!response.ok) {
    throw new Error("Offline page could not be cached.");
  }

  const offlineResponse = new Response(await response.text(), {
    status: 200,
    headers: {
      "Cache-Control": "no-cache",
      "Content-Type": "text/html; charset=utf-8",
    },
  });

  await cache.put(OFFLINE_CACHE_KEY, offlineResponse);
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) =>
        Promise.all([cache.addAll(STATIC_ASSETS), cacheOfflinePage(cache)]),
      )
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("dekatevent-") && key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(async () => {
        const offlineResponse = await caches.match(OFFLINE_CACHE_KEY);

        return (
          offlineResponse ??
          new Response("DekatEvent sedang offline.", {
            status: 503,
            headers: { "Content-Type": "text/plain; charset=utf-8" },
          })
        );
      }),
    );
    return;
  }

  const isStaticAsset =
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/icons/") ||
    /\.(?:css|js|png|jpg|jpeg|webp|svg|ico|woff2?)$/i.test(url.pathname);

  if (!isStaticAsset) return;

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;

      return fetch(request).then((response) => {
        if (!response.ok || response.type === "opaque") return response;
        const copy = response.clone();
        void caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        return response;
      });
    }),
  );
});
