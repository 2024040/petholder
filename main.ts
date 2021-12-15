input.onButtonPressed(Button.A, function () {
    basic.showString("" + (input.temperature()))
})
function getTemp () {
    lm60OutAvg = 0
    vref = 0
    for (let index = 0; index < ADC_LOOP_CNT; index++) {
        lm60OutAvg += pins.analogReadPin(AnalogPin.P1)
    }
    lm60OutAvg = Math.idiv(lm60OutAvg, ADC_LOOP_CNT)
    ctemp = (lm60OutAvg - 424) / 6.25
    ctemp = ctemp * -1
    ctemp = ctemp - toffset
    serial.writeNumber(ctemp)
    serial.writeLine("")
}
let ctemp = 0
let vref = 0
let lm60OutAvg = 0
let toffset = 0
let ADC_LOOP_CNT = 0
let REF_LOOP_CNT = 0
let i = 0
ADC_LOOP_CNT = 100
// 誤差調整
toffset = 10
let PixelArray = neopixel.create(DigitalPin.P0, 24, NeoPixelMode.RGB)
basic.forever(function () {
    getTemp()
    // if (ctemp < 28) {
    // for (let j = 0; j <= 255; j++) {
    // PixelArray.showColor(neopixel.rgb(0, 0, j))
    // basic.pause(10)
    // }
    // } else if (ctemp > 28) {
    // for (let i = 0; i < 255; i++) {
    // PixelArray.showColor(neopixel.rgb(i, 0, 0))
    // basic.pause(100)
    // }
    // } else {
    // PixelArray.clear()
    // PixelArray.show()
    // }
    while (ctemp < 28) {
        PixelArray.showColor(neopixel.rgb(0, 0, 255))
        if (ctemp > 28) {
            for (let j = 0; j <= 254; j++) {
                PixelArray.setBrightness(j)
            }
            break;
        }
    }
    while (ctemp > 28) {
        PixelArray.showColor(neopixel.rgb(255, 0, 0))
        if (ctemp < 28) {
            for (let k = 0; k <= 254; k++) {
                PixelArray.setBrightness(k)
            }
            break;
        }
    }
})
