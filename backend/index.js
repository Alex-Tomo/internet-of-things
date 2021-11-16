//const {checkCard} = require('./read');
const wallet = require('./digital-wallet');
const express = require('express');
const cors = require('cors');

const app = express();
const port = 8080;


app.use(express.json());
app.use(cors());

//for testing purposes we will have a wallet creation page at login
const walletOne = new wallet('10215645321', 'Jordan Short', 50, 1, 2, 200, 500);
const walletTwo = new wallet('34563456345', 'Bill Clinton', 50, 1, 2, 200, 500);


/*setInterval(() => {
    flag = checkCard();
    if(flag) {
        walletOne.addBalance();
        console.log(`New balance is: ${walletOne.balance}`);
    }
}, 500);*/

//Wallets will be stored in this wallet list dynamically.
var walletList = [walletOne, walletTwo];

//Main route, prints list of all instantiated wallets
app.get('/', (req, res) => {res.json({walletList})})

//Postman Test to ensure that the we are able to add a balance and a transaction to the transaction history.
app.post('/test', (req, res) => {
    walletOne.addBalance();
    res.end();
})

/*Settings endpoint, this needs to be passed in all values via JSON like so:
    {
        walletID: int e.g 10215645321, 
        walletName: String, 
        depositAmount: int, 
        colour: int,
        sound: int,
        depositLimit: int
    }
*/
app.post('/settings', (req, res) => {
    var settingData = [req.body.walletID,req.body.walletName,req.body.depositAmount,req.body.colour,req.body.sound,req.body.depositLimit];
//Loop to find the correct wallet and ammend the settings. This will be changed to be tidier.
error = true;
    for(i = 0; i < walletList.length; ++i){
        if(settingData[0] == walletList[i].id){
            console.log(`found wallet ${walletList[i].name}`);
            walletList[i].name = settingData[1];
            walletList[i].depositAmount = settingData[2];
            walletList[i].colour = settingData[3];
            walletList[i].noise = settingData[4];
            walletList[i].depositLimit = settingData[5];
            error = false;
            res.end("Settings Updated")
        }
    }
    if(error != false){
    res.end("Whoops!, You must have entered the incorrect WalletID");
    }
})

app.listen(port, () => {
    console.log(`server started on port: ${port}`);
})
