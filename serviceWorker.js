self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('git-finder-cache')
        .then(function(cache) {
          return cache.addAll([
            '/index.html',
            '/script.js',
            '/styles.css',
            '/assets'
          ]);
        })
    );
  });
  
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          if (response) {
            return response; // Serve from cache
          }
          return fetch(event.request); // Fetch from network
        })
    );
  });
  
  self.addEventListener('activate', function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.filter(function(cacheName) {
            return cacheName !== 'git-finder-cache';
          }).map(function(cacheName) {
            return caches.delete(cacheName);
          })
        );
      })
    );
  });
  