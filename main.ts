let lm60OutAvg = 0
let vref = 0
let ctemp = 0
let REF_LOOP_CNT = 0
let ADC_LOOP_CNT = 100
let toffset = 10 //誤差調整
let PixelArray = neopixel.create(DigitalPin.P0, 24, NeoPixelMode.RGB)
let i = 0

basic.forever(function () {
    getTemp()
        if (ctemp < 28) {
            for(let i = 0; i < 256; i++){
                PixelArray.showColor(neopixel.rgb(0, 0, i))
                basic.pause(100)
            }
        } else if (ctemp > 28) {
            for (let i = 0; i < 255; i++) {
                PixelArray.showColor(neopixel.rgb(i, 0, 0))
            }
        } else {
            PixelArray.clear()
            PixelArray.show()
        }
})

function getTemp() {
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