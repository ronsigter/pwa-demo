window.navigator.geolocation.getCurrentPosition((event) => {
  const el = document.getElementById('location')
  console.log(event)
  el.innerHTML = `
    <div class="device-location">
      <p>Latitude: ${event.coords.latitude.toFixed(2)}</p>
      <p>Longitude: ${event.coords.longitude.toFixed(2)}</p>
    </div>
  `
})
