const CACHE='pochos-v42';
self.addEventListener('install',e=>{self.skipWaiting();});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch',e=>{
  if(e.request.url.includes('firebase')||e.request.url.includes('googleapis')||e.request.url.includes('fonts.g'))return;
  e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
});
