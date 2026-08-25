const CACHE_NAME = 'hesl-ta-app-v1';
const urlsToCache = [
'./index.html',
'./manifest.json',
'./logo.png',
'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js'
];

// Install Service Worker
self.addEventListener('install', event => {
event.waitUntil(
caches.open(CACHE_NAME)
.then(cache => {
console.log('Opened cache');
return cache.addAll(urlsToCache);
})
);
});

// Fetch Cached Files when Offline/Online
self.addEventListener('fetch', event => {
event.respondWith(
caches.match(event.request)
.then(response => {
if (response) {
return response;
}
return fetch(event.request);
})
);
});

// Activate and Clean up old caches
self.addEventListener('activate', event => {
const cacheWhitelist = [CACHE_NAME];
event.waitUntil(
caches.keys().then(cacheNames => {
return Promise.all(
cacheNames.map(cacheName => {
if (cacheWhitelist.indexOf(cacheName) === -1) {
return caches.delete(cacheName);
}
})
);
})
);
});