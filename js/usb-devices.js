let device
const filters = { filters: [] }

function setup(device) {
  return device
    .open()
    .then(() => device.selectConfiguration(1))
    .then(() =>
      device.claimInterface(device.configuration.interfaces[0].interfaceNumber)
    )
}

function print() {
  const string = document.getElementById('printContent').value + '\n'
  const encoder = new TextEncoder()
  const data = encoder.encode(string)
  device.transferOut(2, data).catch((error) => {
    console.log(error)
  })
}

function connectAndPrint() {
  if (device == null) {
    navigator.usb
      .requestDevice(filters)
      .then((selectedDevice) => {
        device = selectedDevice
        console.log(device)
        return setup(device)
      })
      .then(() => print())
      .catch((error) => {
        console.log(error)
      })
  } else print()
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

const printBtn = document.getElementById('print')
printBtn.addEventListener('click', connectAndPrint)
