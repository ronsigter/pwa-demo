window.addEventListener('deviceorientation', (event) => {
  const el = document.getElementById('motion')
  console.log(event)
  el.innerHTML = `
    <div class="device-orientation">
      <p>Alpha: ${event.alpha.toFixed(2)}&#176;</p>
      <p>Beta: ${event.beta.toFixed(2)}&#176;</p>
      <p>Gamma: ${event.gamma.toFixed(2)}&#176;</p>
    </div>
  `
})
