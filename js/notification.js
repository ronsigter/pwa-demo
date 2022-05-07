document.getElementById('notiPerm').addEventListener('click', () => {
  Notification.requestPermission(function (result) {
    console.log('User choice', result)
    if (result !== 'granted') {
      console.log('No notification permission granted!')
    } else {
      console.log('Notification Granted!')
    }
  })
})

document.getElementById('getNotification').addEventListener('click', () => {
  if (Notification.permission == 'granted') {
    navigator.serviceWorker.getRegistration().then(function (reg) {
      var options = {
        body: 'Here is a notification body!',
        icon: '/images/digong.png',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1,
        },
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
      }
      reg.showNotification('Hello world!', options)
    })
  }
})
