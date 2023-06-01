const CACHE_NAME = 'git-finder-cache';

self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then((cache) => {
          return cache.addAll([
            '/',
            '/index.html',
            '/script.js',
            '/styles.css',
            '/assets',
            '/git-finder',
            '/mayankbohra.github.io/git-finder/'
          ]);
        })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          if (response) {
            return response; // Serve from cache
          }
          return fetch(event.request); // Fetch from network
        })
    );
  });
  
  self.addEventListener('activate', (event) => {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.filter((cacheName) => {
            return cacheName !== CACHE_NAME;
          }).map((cacheName) => {
            return caches.delete(cacheName);
          })
        );
      })
    );
  });
  