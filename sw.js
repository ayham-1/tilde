var cacheName = 'ayham.xyz';
var filesToCache = [
	'/',
	'/font.woff',
	'/store/font.woff',
	'/blog/font.woff',

	'/index.htm',
	'/styles.css',
	'/blog/index.html',
	'/store/index.html',
	'/pix/pfp/',
	'/books.htm',
	'/proj.htm',
	'/setup.htm',
	'/contact.htm'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    await cache.addAll(contentToCache);
  })());
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(cacheName).then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});

/* Clearing the Cache */
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keyList) => {
    return Promise.all(keyList.map((key) => {
      if (key === cacheName) { return; }
      return caches.delete(key);
    }))
  }));
});
