const staticCacheName = 'site-static';
const dynamic_Cache = 'site-dynamic-v1';
const assets = [
  '',
  'https://fonts.googleapis.com/css2?family=Markazi+Text&display=swap',
  'css/styles.css',
  'https://www.geogebra.org/apps/deployggb.js',
  'pages/fallback.html',
  'img/تابع-به-عنوان-یک-ماشین-400x222.jpg',
  'img/TSA.jpg',
  'img/unknown.png',
  'img/functionRdart.png',
  'img/formolaTG.jpg',
  'https://fonts.googleapis.com/css2?family=Poppins&display=swap',
  'pages/geogebra.html',
];
const limitcashsize = (name ,size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if(keys.length > size){
        caches.delete(keys[0]).then(limitcashsize(name, size));
      }
    })
  })
}

//nasb service worker baraye responsive shodan site
self.addEventListener('install', evt => {
  //console.log('service worker installed');
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});

// install event
self.addEventListener('activate', evt => {
  //console.log('service worker activated');
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== staticCacheName && key !== dynamicCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

//fetch
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request).then(fetchRes => {
        return caches.open(dynamicCacheName).then(cache => {
          cache.put(evt.request.url, fetchRes.clone());
          limitcashsize(dynamicCacheName, 3);
          return fetchRes;
        })
      });
    }).catch(() => caches.match('static/pages/fallback.html'))
  );
});
//In the above code, I have described that get the information and save it under cache. And use that cache when offline