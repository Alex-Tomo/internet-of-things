const LCDPI = require('raspberrypi-liquid-crystal');
const { sleep } = require('rpio');

class LCD {
    lcd;

    constructor() {
        this.lcd = new LCDPI(1, 0x3f, 16, 2);

        this.lcd.beginSync()
        this.lcd.clearSync();
        this.lcd.printSync(`Loading balance...`);
    }

    initalBalance(balance) {
        this.lcd.clearSync();

        this.lcd.printLineSync(0, 'Total Balance');
        this.lcd.printLineSync(1, `$${balance}.00`);
    }

    updateDepositName(name, depositAmount) {
        this.lcd.clearSync();

        this.lcd.printLineSync(0, `${name}`);
        this.lcd.printLineSync(1, `deposited $${depositAmount}!`);
    }

    updateErrorMessage() {
        this.lcd.clearSync();

        this.lcd.printLineSync(0, `Error!`);
        this.lcd.printLineSync(1, `Cannot Read Card`);
    }

    updateBalance(balance) {
        sleep(1);

        this.lcd.clearSync();

        this.lcd.printLineSync(0, 'Total Balance');
        this.lcd.printLineSync(1, `$${balance}.00`);
    }
}

module.exports = LCD;