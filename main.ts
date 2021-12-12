let lm60OutAvg = 0
let vref = 0
let ctemp = 0
let REF_LOOP_CNT = 0
let ADC_LOOP_CNT = 100
let toffset = 20 //誤差調整

basic.forever(function () {
    getTemp()
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

    serial.writeNumber(ctemp)
    serial.writeLine("")
}