// 와이파이가 끊겨도 시계가 열리게 하는 서비스 워커.
// 인터넷이 되면 항상 새로 받아서(고친 내용이 바로 반영) 사본을 저장해 두고,
// 인터넷이 안 되면 저장해 둔 사본으로 연다. 날씨는 여기서 저장하지 않는다(페이지가 따로 기억함).
var CACHE = 'desk-clock-v1';

self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });

function worthKeeping(url) {
  return url.origin === self.location.origin || url.hostname === 'cdn.jsdelivr.net';
}

self.addEventListener('fetch', function (e) {
  var url = new URL(e.request.url);
  if (e.request.method !== 'GET' || !worthKeeping(url)) return;   // 날씨 서버 등은 그냥 인터넷으로
  e.respondWith(
    fetch(e.request).then(function (res) {
      var copy = res.clone();
      caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
      return res;
    }).catch(function () {
      return caches.match(e.request, { ignoreSearch: true }).then(function (hit) {
        return hit || (e.request.mode === 'navigate' ? caches.match('./') : Response.error());
      });
    })
  );
});
