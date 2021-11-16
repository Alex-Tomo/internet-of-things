const MFRC522 = require('mfrc522-rpi');
const SoftSPI = require("rpi-softspi");

const GPIO = require('onoff').Gpio;

const LEDR = new GPIO(22, 'out');
const LEDG = new GPIO(17, 'out');
const LEDB = new GPIO(27, 'out');

LEDR.writeSync(1);
LEDG.writeSync(1);
LEDB.writeSync(1);


const softSPI = new SoftSPI({
    clock: 23, // pin number of SCLK
    mosi: 19, // pin number of MOSI
    miso: 21, // pin number of MISO
    client: 24 // pin number of CS
});

console.log("Scanning for tag...");
let rfid = new MFRC522(softSPI).setResetPin(22);

const checkCard = (colour) => {
    let flag = false;

    rfid.reset();
    let response = rfid.findCard();
    // response.status = true/false

    if(response.status) {
        // console.log(response);
        // console.log("Card Detected: " + rfid.getDataForBlock);

        flashLED(getLEDColour(colour));

        flag = true;
    }

    if(!response.status) {
        LEDR.writeSync(1);
        LEDG.writeSync(1);
        LEDB.writeSync(1);
    }

    rfid.stopCrypto();
    return flag;
}

const sleep = (milliseconds) => {
    let start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}

const getLEDColour = (colour) => {
    let LED = {};
    switch (colour) {
        case 0: LED = {'r' : 1, 'g' : 0, 'b' : 0}; break;
        case 1: LED = {'r' : 0, 'g' : 1, 'b' : 0}; break;
        case 2: LED = {'r' : 0, 'g' : 0, 'b' : 1}; break;
        case 3: LED = {'r' : 1, 'g' : 1, 'b' : 0}; break;
        case 4: LED = {'r' : 1, 'g' : 0, 'b' : 1}; break;
        case 5: LED = {'r' : 0, 'g' : 1, 'b' : 1}; break;
        case 6: LED = {'r' : 0, 'g' : 0, 'b' : 0}; break;
        default: LED = {'r' : 1, 'g' : 1, 'b' : 1}; break;
    }
    return LED;
}

const flashLED = (colour) => {
    for(let i = 0; i < 3; i++) {
        LEDR.writeSync(colour.r);
        LEDG.writeSync(colour.g);
        LEDB.writeSync(colour.b);

        sleep(250);

        LEDR.writeSync(1);
        LEDG.writeSync(1);
        LEDB.writeSync(1);

        sleep(250);
    }
}

module.exports = {
    checkCard: checkCard,
    sleep: sleep,
    getLEDColour: getLEDColour,
    flashLED: flashLED
}
