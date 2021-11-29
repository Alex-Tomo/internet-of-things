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
        let id = this.rfid.getUid();
        this.rfid.stopCrypto();
        return { status: response.status, id: id.data[2] };
    }
}

module.exports = RFID;