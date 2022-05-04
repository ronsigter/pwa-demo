let port

const write = async (command) => {
  if (port) {
    const textEncoder = new TextEncoderStream()
    const writableStreamClosed = textEncoder.readable.pipeTo(port.writable)

    const writer = textEncoder.writable.getWriter()
    await writer.write(command)

    writer.close()
    await writableStreamClosed
  }
}

document.getElementById('serialConnect').addEventListener('click', async () => {
  // Prompt user to select any serial port.
  port = await navigator.serial.requestPort()

  // Wait for the serial port to open.
  await port.open({ baudRate: 9600 })
})

document.getElementById('serialOn').addEventListener('click', async () => {
  await write('on')
})

document.getElementById('serialOff').addEventListener('click', async () => {
  await write('off')
})

document.getElementById('serialClose').addEventListener('click', async () => {
  await port.close()
})

document.getElementById('colorPicker').addEventListener('change', async (e) => {
  const hex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e.target.value)
  const rgb = {
    r: parseInt(hex[1], 16),
    g: parseInt(hex[2], 16),
    b: parseInt(hex[3], 16),
  }
  console.log(rgb)
  await write(JSON.stringify(rgb))
})
