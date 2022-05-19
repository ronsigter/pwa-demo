// declare name of cache
const cacheName = 'pwa-v2'

// assets to be cache
const assets = [
  '/',
  '/index.html',
  '/other-pwa.html',
  '/css/style.css',
  '/js/app.js',
  '/js/bluetooth.js',
  '/js/contact-picker.js',
  '/js/device-motion.js',
  '/js/file-system.js',
  '/js/idle-detection.js',
  '/js/location.js',
  '/js/sharing.js',
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

// ? SECOND LIFECYCLE OF SW - "INSTALLATION"
// listen to `intall` event of serviceWorker. Called only once
self.addEventListener('install', (installEvent) => {
  // Caching something on the browser can take some time to finish because it's asynchronous.
  // So, we wait for the action to finish.
  installEvent.waitUntil(
    // Once the cache API is ready, we can run the open() method
    // and create our cache by passing its name as an argument to
    // caches.open(cacheName).
    caches.open(cacheName).then((cache) => {
      // Then it returns a promise,
      // which helps us store our assets in the cache with
      // cache.addAll(assets).
      cache.addAll(assets)
    })
  )
})

// ? THIRD LIFECYCLE OF SW - "ACTIVE"
self.addEventListener('activate', (event) => {
  console.log('V1 now ready to handle fetches!')
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

// Push Notification
self.addEventListener('push', (event) => {
  const title = 'A message from the President'
  const body = 'Patayen keta'
  const icon = '/images/digong.png'
  const tag = 'simple-push-demo-notification-tag'

  event.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      icon: icon,
      tag: tag,
      actions: [
        {
          action: 'explore',
          title: 'Explore this new world',
        },
        {
          action: 'close',
          title: 'Close notification',
        },
      ],
    })
  )
})
