// declare name of cache
const staticDevCoffee = 'dev-coffee-site-v1'

// assets to be cache
const assets = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/app.js',
  '/images/pokes/pokemon-1.png',
  '/images/pokes/pokemon-2.png',
  '/images/pokes/pokemon-3.png',
  '/images/pokes/pokemon-4.png',
  '/images/pokes/pokemon-5.png',
  '/images/pokes/pokemon-6.png',
  '/images/pokes/pokemon-7.png',
  '/images/pokes/pokemon-8.png',
  '/images/pokes/pokemon-9.png',
]

// listen to `intall` event of serviceWorker. Called only once
self.addEventListener('install', (installEvent) => {
  // Caching something on the browser can take some time to finish because it's asynchronous.
  // So, we wait for the action to finish.
  installEvent.waitUntil(
    // Once the cache API is ready, we can run the open() method
    // and create our cache by passing its name as an argument to
    // caches.open(staticDevCoffee).
    caches.open(staticDevCoffee).then((cache) => {
      // Then it returns a promise,
      // which helps us store our assets in the cache with
      // cache.addAll(assets).
      cache.addAll(assets)
    })
  )
})

// We will use `fetch` event to get back our data.
self.addEventListener('fetch', (fetchEvent) => {
  // The callback gives us access to fetchEvent.
  // Then we attach respondWith() to prevent the browser's default response.
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((res) => {
      return res || fetch(fetchEvent.request)
    })
  )
})
