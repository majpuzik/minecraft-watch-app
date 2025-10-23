// Service Worker pro Minecraft Hodinky PWA
const CACHE_NAME = 'minecraft-watch-v1.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/base.css',
  '/css/watch.css',
  '/css/phone.css',
  '/js/game.js',
  '/manifest.json'
];

// Instalace SW
self.addEventListener('install', event => {
  console.log('🔧 Service Worker: Instalace');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 Cache otevřena');
        return cache.addAll(urlsToCache);
      })
  );
});

// Aktivace SW
self.addEventListener('activate', event => {
  console.log('✅ Service Worker: Aktivace');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Mazání staré cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch - cache first strategie
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request).then(response => {
          // Nekešujeme non-GET requesty
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
  );
});
