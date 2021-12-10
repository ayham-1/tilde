var cacheName = 'ayham.xyz';
var filesToCache = [
	'/',
	'/font.woff',
	'/store/font.woff',
	'/blog/font.woff',
	'/index.htm',
	'/styles.css',
	'/blog/index.html',
	'/blog/*',
	'/store/index.html',
	'/store/*',
	'/pix/pfp/'
	'/books.htm',
	'/proj.htm',
	'/contact.htm'
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
