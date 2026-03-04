self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
});

self.addEventListener('fetch', (e) => {
    // Membiarkan fetch berjalan normal (bisa dikembangkan buat offline mode nanti)
});