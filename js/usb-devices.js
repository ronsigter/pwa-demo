let device
const filters = { filters: [] }

const print = () => {
  const string = document.getElementById('printContent').value + '\n'
  const encoder = new TextEncoder()
  const data = encoder.encode(string)
  device.transferOut(2, data).catch((error) => {
    console.log(error)
  })
}

const connect = async () => {
  if (device == null) {
    try {
      device = await navigator.usb.requestDevice(filters)
      await device.open()
      await device.selectConfiguration(1)
      await device.claimInterface(
        device.configuration.interfaces[0].interfaceNumber
      )
    } catch (error) {
      console.log(error)
    }
  } else console.log('[USB Thermal Printer]: Already Connected')
}

navigator.usb
  .getDevices()
  .then((devices) => {
    if (devices.length > 0) {
      device = devices[0]
      return setup(device)
    }
  })
  .catch((error) => {
    console.log(error)
  })

document.getElementById('print').addEventListener('click', print)
document.getElementById('printConnect').addEventListener('click', connect)
