const CACHE_NAME = "netflix-clone-cache-v2";
const urlsToCache = [
  "index.html",
  "style.css",
  "app.js",
  "icons/icon-192x192.png",
  "icons/icon-512x512.png"
];

// Install event: cache assets
self.addEventListener("install", (event) => {
  console.log("📦 Installing service worker...");
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .catch((err) => console.error("❌ Cache add failed", err))
  );
});

// Fetch event: serve from cache or network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});

// Sync event: background sync logic (mocked)
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-tag") {
    console.log("🔁 Background sync triggered!");
    event.waitUntil(syncDataWithServer());
  }
});

async function syncDataWithServer() {
  // Simulate sending queued data to server
  console.log("📤 Syncing data to server...");
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log("✅ Sync complete.");
}

// Push event: show notification
self.addEventListener("push", (event) => {
  const data = event.data?.text() || "Default Push Message";
  const options = {
    body: data,
    icon: "icons/icon-192x192.png",
    badge: "icons/icon-192x192.png"
  };
  event.waitUntil(
    self.registration.showNotification("🔥 Push Notification", options)
  );
});
