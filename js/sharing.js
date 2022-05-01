const shareBtn = document.getElementById('share')

shareBtn.onclick = async (filesArray) => {
  try {
    await navigator.share({
      title: 'Awesome PWA Demo',
      text: 'I learned how to build a PWA today',
      url: window.location.href,
    })
    console.log('Share was successful.')
  } catch (error) {
    console.log('Sharing failed', error)
  }
}
