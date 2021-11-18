const LCDPI = require('raspberrypi-liquid-crystal');

class LCD {
    lcd;

    constructor() {
        this.lcd = new LCDPI(1, 0x3f, 16, 2);

        this.lcd.beginSync()
        this.lcd.clearSync();
        this.lcd.printSync(`Loading balance...`);
    }


    updateBalance(balance) {
        this.lcd.clearSync();
        this.lcd.printSync(`balance = ${balance}`);
    }
}

module.exports = LCD;