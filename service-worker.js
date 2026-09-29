const CACHE_VERSION='kontaxer-v7';
const SHELL=[
 './','./index.html','./privacy.html','./privacy.js','./styles.css','./app.js','./manifest.webmanifest',
 './js/assistant/knowledge-base.js','./js/assistant/normalize.js','./js/assistant/scorer.js','./js/assistant/memory.js','./js/assistant/responder.js','./js/assistant/engine.js',
 './assets/favicon.png','./assets/kontaxer-logo.png','./assets/kontaxer-logo-lockup.png','./assets/apple-touch-icon.png','./assets/icon-192.png','./assets/icon-512.png','./assets/icon-maskable-512.png','./assets/og-image.png',
 './assets/service-contabilidad.svg','./assets/service-tributaria.svg','./assets/service-auditorias.svg','./assets/service-finanzas.svg'
];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE_VERSION).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE_VERSION).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 const request=event.request;if(request.method!=='GET'||new URL(request.url).origin!==location.origin)return;
 if(request.mode==='navigate'){
  event.respondWith(fetch(request).then(response=>{const copy=response.clone();event.waitUntil(caches.open(CACHE_VERSION).then(cache=>cache.put(request,copy)));return response;}).catch(async()=>await caches.match(request)||await caches.match('./index.html')));
  return;
 }
 event.respondWith(caches.match(request).then(cached=>{
  const fresh=fetch(request).then(response=>{if(response.ok)event.waitUntil(caches.open(CACHE_VERSION).then(cache=>cache.put(request,response.clone())));return response;});
  if(cached){event.waitUntil(fresh.catch(()=>{}));return cached;}
  return fresh.catch(()=>caches.match(request));
 }));
});
