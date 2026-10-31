// 앱으로 설치할 수 있게 해 주는 최소한의 서비스 워커.
// 아무것도 저장(캐시)하지 않고 항상 인터넷에서 새로 받으므로, 고친 내용이 바로 반영된다.
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function (e) { e.respondWith(fetch(e.request)); });
