const CACHE_NAME = 'midnight-library-v1';
const ASSETS = ['index.html', 'style.css', 'script.js', 'poems.json', 'manifest.json'];

self.addEventListener('install', (e) => {
    self.skipWaiting();
    e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('activate', (e) => {
    e.waitUntil(caches.keys().then((keys) => Promise.all(keys.map((k) => {
        if (k !== CACHE_NAME) return caches.delete(k);
    }))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        fetch(e.request).then((res) => {
            const clone = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
            return res;
        }).catch(() => caches.match(e.request))
    );
});
