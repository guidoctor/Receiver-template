input.onButtonPressed(Button.A, function () {
    if (radio_group == 9) {
        radio_group = 0
    } else {
        radio_group += 1
    }
    remote.setGroup(radio_group)
})
remote.onRemoteControl(function () {
    if (radio.receivedPacket(RadioPacketProperty.SerialNumber) == master) {
        remote.remoteControlAction()
    } else if (radio.receivedPacket(RadioPacketProperty.SignalStrength) > controller_signal) {
        controller_serial = radio.receivedPacket(RadioPacketProperty.SerialNumber)
        controller_signal = radio.receivedPacket(RadioPacketProperty.SignalStrength)
        remote.remoteControlAction()
    } else if (radio.receivedPacket(RadioPacketProperty.SerialNumber) == controller_serial) {
        controller_signal = radio.receivedPacket(RadioPacketProperty.SignalStrength)
        remote.remoteControlAction()
    }
})
radio.onReceivedNumber(function (receivedNumber) {
    if (radio.receivedPacket(RadioPacketProperty.SerialNumber) == master) {
        radio.sendNumber(0)
    } else {
        master = radio.receivedPacket(RadioPacketProperty.SerialNumber)
        radio.sendNumber(master)
    }
})
let controller_serial = 0
let controller_signal = 0
let master = 0
let radio_group = 0
radio_group = 0
master = 0
controller_signal = -130
controller_serial = 0
basic.forever(function () {
    basic.showNumber(radio_group)
}) 