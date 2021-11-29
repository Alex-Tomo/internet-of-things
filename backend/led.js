const GPIO = require('onoff').Gpio;
const { sleep } = require('./sleep.js');

const REDPIN = 22;
const GREENPIN = 17;
const BLUEPIN = 27;

class LED {

    LedR;
    LedG;
    LedB;

    Led = {'r' : 1, 'g' : 1, 'b' : 1};

    constructor() {
        this.LedR = new GPIO(REDPIN, 'out');
        this.LedG = new GPIO(GREENPIN, 'out');
        this.LedB = new GPIO(BLUEPIN, 'out');

        this.turnOff();
    }

    turnOff() {
        this.LedR.writeSync(1);
        this.LedG.writeSync(1);
        this.LedB.writeSync(1);
    }

    turnOn() {
        this.LedR.writeSync(this.led.r);
        this.LedG.writeSync(this.led.g);
        this.LedB.writeSync(this.led.b);
    }

    flash() {
        for(let i = 0; i < 3; i ++) {
            this.turnOn();
            sleep(250);
            this.turnOff();
            sleep(250);
        }
    }

    errorFlash() {
        for(let i = 0; i < 8; i ++) {
            this.turnOn();
            sleep(100);
            this.turnOff();
            sleep(100);
        }
    }

    setLEDColour = (colour) => {
        switch (colour) {
            case 0: this.led = {'r' : 1, 'g' : 0, 'b' : 0}; break;
            case 1: this.led = {'r' : 0, 'g' : 1, 'b' : 0}; break;
            case 2: this.led = {'r' : 0, 'g' : 0, 'b' : 1}; break;
            case 3: this.led = {'r' : 1, 'g' : 1, 'b' : 0}; break;
            case 4: this.led = {'r' : 1, 'g' : 0, 'b' : 1}; break;
            case 5: this.led = {'r' : 0, 'g' : 1, 'b' : 1}; break;
            case 6: this.led = {'r' : 0, 'g' : 0, 'b' : 0}; break;
            default: this.led = {'r' : 1, 'g' : 1, 'b' : 1}; break;
        }
        return this.led;
    }
}

module.exports = LED;