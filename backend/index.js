const Wallet = require('./digital-wallet')
const userAccount = require('./user-account')
const Database = require('./dbFunc')
const express = require('express')
const cors = require('cors')

/*
const RFID = require('./rfid');
let rfid = new RFID();

const LED = require('./led');
const led = new LED();

const SPEAKER = require('./speaker');
const speaker = new SPEAKER();

const LCD = require('./lcd');
const lcd = new LCD();*/

// Create and instance of express and capture port number.
const app = express()
const port = 8080

// for testing purposes we will have a wallet creation page at login
const walletOne = new Wallet('10215645321', 'Person 1', 50, 1, 5, 200, 500)
const walletList = [walletOne]

app.use('/', express.static('./src'))
app.use(express.json())
app.use(cors())

/*
lcd.updateBalance(walletOne.balance);
setInterval(() => {
    if (rfid.scanCard()) { 
        walletOne.addBalance()
        console.log(`New balance is: ${walletOne.balance}`)

        // update the LCD with the new balance, play a noise,
        // set the colour of the LEDs and flash
        lcd.updateBalance(walletOne.balance);
        speaker.playSound(walletOne.noise);
        led.setLEDColour(walletOne.colour);
        led.flash();
    }
}, 500)*/

// Prints list of all instantiated wallets
app.get('/wallets', (req, res) => {
  res.json({
      walletList
  })
})

//test to see if get pulls database data
app.get('/dbWallet', (req, res) => {
    Database.getAllWallets()
    .then(userWallet => {
      res.status(200).json(userWallet)
    })
    .catch(error => {
      res.status(500).json({message: "Unaable to retrieve userWallet"}); 
    });
})

//test to see if get pulls database data
app.get('/dbTransactions', (req, res) => {
  Database.getAllTransactions()
  .then(transactionHistory => {
    res.status(200).json(transactionHistory)
  })
  .catch(error => {
    res.status(500).json({message: "Unaable to retrieve transaction history"}); 
  });
})

//test to see if get pulls database data
app.get('/dbWallet/:id', (req, res) => {
  const { id } = req.params;

  Database.getWalletById(id)
  .then(userWallet => {
    if (userWallet) {
    res.status(200).json(userWallet)
    } else {
      res.status(404).json({message: "wallet not found"});
    }
  })
  .catch(error => {
    res.status(500).json({message: "Unable to perform operation"}); 
  });
})


//test to see if get pulls database data
app.get('/dbTransactions/:userId', (req, res) => {
  const { userId }  = req.params;

  Database.getTransactionsById(userId)
  .then(transactionHistory => {
    if (transactionHistory){
    res.status(200).json(transactionHistory)
    } else {
      res.status(404).json({message: "history not found"});
    }
  })
  .catch(error => {
    res.status(500).json({message: "Unable to find transaction history for selected user"}); 
  });
})

app.post('/settings', (req, res) => {
  // Parses the post request body elements and places into an array "settingData"
  const settingData = [req.body.walletID, req.body.walletName, req.body.depositAmount, req.body.colour, req.body.sound, req.body.depositLimit]
  let error = true

  // Loops over walletList (assigned wallets) in order to find the requested wallet and assign the settings profile
  for (let i = 0; i < walletList.length; ++i) {
      if (settingData[0] === parseInt(walletList[i].id, 10)) {
          console.log(`wallet id: ${walletList[i].id} updated.`)
              // Assigning wallet attributes to the settings recieved by the post request.
          walletList[i].name = settingData[1]
          walletList[i].depositAmount = settingData[2]
          walletList[i].colour = settingData[3]
          walletList[i].noise = settingData[4]
          walletList[i].depositLimit = settingData[5]
          error = false
          res.end()
      }
  }
  // Error checking to ensure the endpoint produces an output.
  if (error !== false) res.end('Whoops!, You must have entered the incorrect WalletID')
})

/*
app.post('/deposit', (req, res) => {
    walletOne.addSpecificBalance(req.body.deposit);
    console.log(`New balance is: ${walletOne.balance}`);

    // update the LCD with the new balance, play a noise,
    // set the colour of the LEDs and flash
    lcd.updateBalance(walletOne.balance);
    speaker.playSound(walletOne.noise);
    led.setLEDColour(walletOne.colour);
    led.flash();

    res.json({balance: walletOne.balance});
})*/

// Listens for http traffic from ${port}
app.listen(port, () => {
  console.log(`server started on port: ${port}`)
})