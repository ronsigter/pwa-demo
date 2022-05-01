if ('IdleDetector' in window) {
  const idleBtn = document.getElementById('idle')
  idleBtn.addEventListener('click', (event) => runIdleDetection())

  async function runIdleDetection() {
    const state = await IdleDetector.requestPermission()
    console.log(state)

    const idleDetector = new IdleDetector()

    idleDetector.addEventListener('change', () => {
      const { userState, screenState } = idleDetector
      console.log(idleDetector)

      if (userState == 'idle') {
        // update database with status
        console.log('You are now in Idle state')
      }
    })

    await idleDetector.start({
      threshold: 60000,
    })
  }
}
