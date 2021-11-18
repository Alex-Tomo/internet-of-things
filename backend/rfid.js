const MFRC522 = require('mfrc522-rpi');
const SoftSPI = require('rpi-softspi');

class RFID {

    softSPI;
    rfid;

    constructor() {
        this.softSPI = new SoftSPI({
            clock: 23, // pin number of SCLK
            mosi: 19, // pin number of MOSI
            miso: 21, // pin number of MISO
            client: 24 // pin number of CS
        });

        this.rfid = new MFRC522(this.softSPI).setResetPin(22);

        console.log("Scanning for tag...");
    }

    // returns true if a card is detected
    scanCard() {
        this.rfid.reset();
        let response = this.rfid.findCard();
        this.rfid.stopCrypto();
        return response.status;
    }
}

module.exports = RFID;