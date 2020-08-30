/* Service workerr woot! */
// If you're intreseted in service workers, you should read this article: https://developers.google.com/web/fundamentals/primers/service-workers

var CACHE_NAME = 'cache-v2';
var urlsToCache = [
  '/',
  '/js/app.js',
  '/css/styles.css',
  '/css/picnic.min.css',
  '/outlinr/',
  '/outlinr/js/outlinr.js',
  '/outlinr/css/outlinr.css',
  '/outlinr/css/picnic.min.css',
  '/privacy',
  '/portfolio',
  '/contact',
  '/datapacks'
];


self.addEventListener('install', function(event) {
  //stuff that runs on worker install
  console.log("I'm alive!");
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  //stuff that runs on fetch
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});

