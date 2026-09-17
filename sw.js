const CACHE_NAME = 'produksi-portal-coral-lagoon-v2';

const LOCAL_ASSETS = [
    './',
    './index.html',
    './lagoon-theme.css',
    './lagoon-scene.js',
    './manifest.json',
    './ikon-192.png',
    './ikon-512.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(LOCAL_ASSETS))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((keys) => Promise.all(
                keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
            ))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;

    const requestUrl = new URL(event.request.url);
    const isLocal = requestUrl.origin === self.location.origin;

    if (!isLocal) {
        event.respondWith(fetch(event.request));
        return;
    }

    event.respondWith(
        caches.match(event.request).then((cached) => {
            const network = fetch(event.request).then((response) => {
                if (response && response.ok) {
                    caches.open(CACHE_NAME).then((cache) => cache.put(event.request, response.clone()));
                }
                return response;
            });

            return cached || network.catch(() => caches.match('./index.html'));
        })
    );
});
