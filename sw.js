var N="letter-v1";
self.addEventListener("install",function(){self.skipWaiting()});
self.addEventListener("activate",function(e){e.waitUntil(self.clients.claim())});
self.addEventListener("fetch",function(e){
if(e.request.method!=="GET")return;
e.respondWith(caches.open(N).then(function(c){
return fetch(e.request).then(function(r){
if(r&&(r.ok||r.type==="opaque"))c.put(e.request,r.clone());
return r;
}).catch(function(){
return c.match(e.request).then(function(m){return m||Response.error()});
});
}));
});
