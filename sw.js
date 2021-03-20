var cacheName = 'hello-pwa';
var filesToCache = [
  '/',
  '/index.html',
  '/chart.html',
  '/log_history.html',
  '/about.html',
  '/valence_arousal.html',
  '/manifest.json',
  '/favicon.ico',
  '/apple-touch-icon.png',
  '/media/app_logo_192.png',
  '/media/app_logo_512.png',  
  '/media/model_of_affect.png',
  '/js/chart.js',
  '/js/index.js',
  '/js/log_history.js',
  '/js/main.js',
  '/js/materialize.js',
  '/js/materialize.min.js',
  '/js/valence_arousal.js',
  '/css/chart.css',
  '/css/index.css',
  '/css/log_history.css',
  '/css/materialize.css',
  '/css/materialize.min.css',
  '/css/valence_arousal.css'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
