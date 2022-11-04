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
  'pages/TG.html',
  'pages/TSA.html',
  'pages/geogebra.html',
];
//محدودیت کچ ها
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
//نصب سرویس ورکر . در این مرحله من میخوام نصب کنم 
self.addEventListener('install', evt => {
  //console.log('service worker installed');
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});

// install event = نصب و فعالسازی سرویس ورکر
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

//fetch = دریافت
self.addEventListener('fetch', evt => {
  //console.log('fetch event', evt);
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
//در کد بالا من توصیف کردم که اطلاعات رو بگیر و ذخیره کن تحت عنوان کَش . و در مواقع افلاین از اون کَش استفاده کن 