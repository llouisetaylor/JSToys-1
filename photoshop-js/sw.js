self.addEventListener('install', (event) => {
    event.waitUntil(
        caches
            .open('drawing')
            .then((cache) => cache.addAll([
                './',
                './index.html',
                './style.css',
                './draw.js',
                './favicon.ico'
            ]))
    );
});

self.addEventListener('fetch', async (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return !navigator.onLine && response
                ? response
                : fetch(event.request);
        })
    );

});