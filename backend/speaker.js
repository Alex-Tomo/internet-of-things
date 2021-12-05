const { exec } = require("child_process");

class Speaker {
    playSound(sound, volume) {
        switch (sound) {
            case 0: exec(`mplayer -volume ${volume} ./src/noises/pig_snort.mp3`); break;
            case 1: exec(`mplayer -volume ${volume} ./src/noises/pig_wree.mp3`); break;
            case 2: exec(`mplayer -volume ${volume} ./src/noises/fart_1.wav`); break;
            case 3: exec(`mplayer -volume ${volume} ./src/noises/fart_2.wav`); break;
            case 4: exec(`mplayer -volume ${volume} ./src/noises/coin_1.wav`); break;
            case 5: exec(`mplayer -volume ${volume} ./src/noises/coin_2.wav`); break;
            case 6: exec(`mplayer -volume ${volume} ./src/noises/laugh_1.mp3`); break;
            case 7: exec(`mplayer -volume ${volume} ./src/noises/laugh_2.mp3`); break;
            default: exec(`mplayer -volume ${volume} ./src/noises/error.wav`); break;
        }
    }
}

module.exports = Speaker;