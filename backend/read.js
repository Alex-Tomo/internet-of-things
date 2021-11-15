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

const checkCard = () => {
    let flag = false;

    rfid.reset();
    let response = rfid.findCard();
    // response.status = true/false

    if(response.status) {
        // console.log(response);
        // console.log("Card Detected: " + rfid.getDataForBlock);
        LEDR.writeSync(1);
        LEDG.writeSync(0);
        LEDB.writeSync(1);
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

module.exports = {
    checkCard: checkCard
}
