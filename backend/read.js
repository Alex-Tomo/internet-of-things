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

        switch (colour) {
            case 0: // light blue
                LEDR.writeSync(1);
                LEDG.writeSync(0);
                LEDB.writeSync(0);

                sleep(250); 

                LEDR.writeSync(1);
                LEDG.writeSync(1);
                LEDB.writeSync(1);

                sleep(250); 

                LEDR.writeSync(1);
                LEDG.writeSync(0);
                LEDB.writeSync(0);

                sleep(250); 

                LEDR.writeSync(1);
                LEDG.writeSync(1);
                LEDB.writeSync(1);

                sleep(250); 

                LEDR.writeSync(1);
                LEDG.writeSync(0);
                LEDB.writeSync(0);

                sleep(250); 

                LEDR.writeSync(1);
                LEDG.writeSync(1);
                LEDB.writeSync(1);

                break; 

            case 1: // purple
                LEDR.writeSync(0);
                LEDG.writeSync(1);
                LEDB.writeSync(0);

                sleep(250); 

                LEDR.writeSync(1);
                LEDG.writeSync(1);
                LEDB.writeSync(1);

                sleep(250); 

                LEDR.writeSync(0);
                LEDG.writeSync(1);
                LEDB.writeSync(0);

                sleep(250); 

                LEDR.writeSync(1);
                LEDG.writeSync(1);
                LEDB.writeSync(1);

                sleep(250); 

                LEDR.writeSync(0);
                LEDG.writeSync(1);
                LEDB.writeSync(0);

                sleep(250); 

                LEDR.writeSync(1);
                LEDG.writeSync(1);
                LEDB.writeSync(1);

                break; 

            case 2: // yellow
                LEDR.writeSync(0);
                LEDG.writeSync(0);
                LEDB.writeSync(1);

                sleep(250); 

                LEDR.writeSync(1);
                LEDG.writeSync(1);
                LEDB.writeSync(1);

                sleep(250); 

                LEDR.writeSync(0);
                LEDG.writeSync(0);
                LEDB.writeSync(1);

                sleep(250); 

                LEDR.writeSync(1);
                LEDG.writeSync(1);
                LEDB.writeSync(1);

                sleep(250); 
                
                LEDR.writeSync(0);
                LEDG.writeSync(0);
                LEDB.writeSync(1);

                sleep(250); 

                LEDR.writeSync(1);
                LEDG.writeSync(1);
                LEDB.writeSync(1);
                
                break; 

            case 3: // dark blue
                LEDR.writeSync(1);
                LEDG.writeSync(1);
                LEDB.writeSync(0);

                sleep(250); 

                LEDR.writeSync(1);
                LEDG.writeSync(1);
                LEDB.writeSync(1);

                sleep(250); 

                LEDR.writeSync(1);
                LEDG.writeSync(1);
                LEDB.writeSync(0);

                sleep(250); 

                LEDR.writeSync(1);
                LEDG.writeSync(1);
                LEDB.writeSync(1);

                sleep(250); 

                LEDR.writeSync(1);
                LEDG.writeSync(1);
                LEDB.writeSync(0);

                sleep(250); 

                LEDR.writeSync(1);
                LEDG.writeSync(1);
                LEDB.writeSync(1);

                break; 

            case 4: // green
                LEDR.writeSync(1);
                LEDG.writeSync(0);
                LEDB.writeSync(1);

                sleep(250); 

                LEDR.writeSync(1);
                LEDG.writeSync(1);
                LEDB.writeSync(1);

                sleep(250); 
                
                LEDR.writeSync(1);
                LEDG.writeSync(0);
                LEDB.writeSync(1);

                sleep(250); 

                LEDR.writeSync(1);
                LEDG.writeSync(1);
                LEDB.writeSync(1);

                sleep(250); 

                LEDR.writeSync(1);
                LEDG.writeSync(0);
                LEDB.writeSync(1);

                sleep(250); 

                LEDR.writeSync(1);
                LEDG.writeSync(1);
                LEDB.writeSync(1);

                break; 

            case 5: // red
                LEDR.writeSync(0);
                LEDG.writeSync(1);
                LEDB.writeSync(1);
                
                sleep(250); 

                LEDR.writeSync(1);
                LEDG.writeSync(1);
                LEDB.writeSync(1);

                sleep(250); 

                LEDR.writeSync(0);
                LEDG.writeSync(1);
                LEDB.writeSync(1);
                
                sleep(250); 

                LEDR.writeSync(1);
                LEDG.writeSync(1);
                LEDB.writeSync(1);

                sleep(250); 

                LEDR.writeSync(0);
                LEDG.writeSync(1);
                LEDB.writeSync(1);
                
                sleep(250); 

                LEDR.writeSync(1);
                LEDG.writeSync(1);
                LEDB.writeSync(1);

                break; 

            case 6: // white
                LEDR.writeSync(0);
                LEDG.writeSync(0);
                LEDB.writeSync(0);

                sleep(250); 

                LEDR.writeSync(1);
                LEDG.writeSync(1);
                LEDB.writeSync(1);

                sleep(250); 

                LEDR.writeSync(0);
                LEDG.writeSync(0);
                LEDB.writeSync(0);

                sleep(250); 

                LEDR.writeSync(1);
                LEDG.writeSync(1);
                LEDB.writeSync(1);

                sleep(250); 

                LEDR.writeSync(0);
                LEDG.writeSync(0);
                LEDB.writeSync(0);

                sleep(250); 

                LEDR.writeSync(1);
                LEDG.writeSync(1);
                LEDB.writeSync(1);

                break; 

            case 7: // off
                LEDR.writeSync(1);
                LEDG.writeSync(1);
                LEDB.writeSync(1);
                break; 
        }

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

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }    
    }
}

module.exports = {
    checkCard: checkCard,
    sleep: sleep
}
