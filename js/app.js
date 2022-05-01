// .container class will hold our cards
const container = document.querySelector('.container')
const coffees = [
  { name: 'Bulbasaur', image: 'images/pokes/pokemon-1.png' },
  { name: 'Ivysaur', image: 'images/pokes/pokemon-2.png' },
  { name: 'Venusaur', image: 'images/pokes/pokemon-3.png' },
  { name: 'Squirtle', image: 'images/pokes/pokemon-4.png' },
  { name: ' Wartortle', image: 'images/pokes/pokemon-5.png' },
  { name: ' Blastoise', image: 'images/pokes/pokemon-6.png' },
  { name: 'Charmander', image: 'images/pokes/pokemon-7.png' },
  { name: 'Charmeleon', image: 'images/pokes/pokemon-8.png' },
  { name: 'Charizard', image: 'images/pokes/pokemon-9.png' },
]

// Then, we create an array of cards with names and images.
const showCoffees = () => {
  let output = ''
  coffees.forEach(
    ({ name, image }) =>
      (output += `
              <div class="card">
                <img class="card--avatar" src=${image} />
                <h1 class="card--title">${name}</h1>
                <a class="card--link" href="#">View</a>
              </div>
              `)
  )
  container.innerHTML = output
}

// we wait until the DOM content finishes loading to run the showCoffees method.
document.addEventListener('DOMContentLoaded', showCoffees)

// Instantiating install button

let deferredPrompt
const installApp = document.getElementById('installApp')

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault()
  // Stash the event so it can be triggered later.
  deferredPrompt = e
  // Update UI to notify the user they can add to home screen
  installApp.style.display = 'inline-block'

  installApp.addEventListener('click', (e) => {
    // hide our user interface that shows our A2HS button
    installApp.style.display = 'none'
    // Show the prompt
    deferredPrompt.prompt()
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt')
      } else {
        console.log('User dismissed the A2HS prompt')
      }
      deferredPrompt = null
    })
  })
})
