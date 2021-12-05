// Code will be refactored when everyone signs off on the changes
const Database = require('./dbFunc')
const express = require('express')
const cors = require('cors')
const ws = require('ws')

const RFID = require('./rfid');
let rfid = new RFID();

const LED = require('./led');
const led = new LED();

const SPEAKER = require('./speaker');
const speaker = new SPEAKER();

const LCD = require('./lcd');
const { sleep } = require('./sleep');
const lcd = new LCD(); 

// Create and instance of express and capture port number.
const app = express()
const wsServer = new ws.Server({ noServer: true })
const port = 8080

app.use('/', express.static('./src'))
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))
app.use(cors())

// Global session variables (don't touch unless you want this house of cards to fall over)
let setSession = false
let currUser = ''
let currTransId = 123
const accounts = [
  { username: 'christina', password: 'password', name: 'Christina', transId: 123 },
  { username: 'kay', password: 'password', name: 'Kay', transId: 125 },
  { username: 'majid', password: 'password', name: 'Majid', transId: 157 }
]

let balance = 0;

Database.getWalletById(10215645321).then(async userWallet => { 
    lcd.initalBalance(userWallet.wallet_balance)
    balance = userWallet.wallet_balance 
});

setInterval(async () => {
    let rfidCard = rfid.scanCard(); 
    if (rfidCard.status) {
        try {
            await Database.getUserById(rfidCard.id)
                .then(user => { 
                    addPigDeposit(user.user_depositAmmount, rfidCard.id) 
                    
                    lcd.updateDepositName(user.user_fname, user.user_depositAmmount);
                    console.log(`New balance is: ${balance + user.user_depositAmmount}`);
                
                    speaker.playSound(user.user_noise, user.user_volume);
                    led.setLEDColour(user.user_colour);
                    led.flash();

                    return user;

                }).then(user => {
                    lcd.updateBalance((balance + user.user_depositAmmount));
                    Database.getWalletById(10215645321)           
                        .then(userWallet => {
                            balance = userWallet.wallet_balance
                    })
                }).then(() => {
                    sleep(3000);
                })
        } catch(error) {
            lcd.updateErrorMessage();

            speaker.playSound(-1, 100);
            led.setLEDColour(5);
            led.errorFlash();

            lcd.updateBalance(balance);
        }
    }
}, 500) 

/*
This function adds a transaction and attaches it to the currently logged in user, we can also amend this so it sets it to a user in the settings
but thats up to you guys
Keeping this function here for people to look over and get back to me
*/
async function addDeposit (amount) {
  const getLatestBalance = await Database.getWalletById(10215645321).then(userWallet => { return userWallet.wallet_balance })
  await Database.addTrans({ transaction_walletid: 10215645321, transaction_userId: currTransId, transaction_value: amount })
  await Database.addToWallet(amount + getLatestBalance)
}

async function addPigDeposit (amount, pigTransId) {
  const getLatestBalance = await Database.getWalletById(10215645321).then(userWallet => { return userWallet.wallet_balance })
  await Database.addTrans({ transaction_walletid: 10215645321, transaction_userId: pigTransId, transaction_value: amount })
  await Database.addToWallet(amount + getLatestBalance)
}

// Websocket endpoint that sends the balance every 1000ms if the client needs it.
wsServer.on('connection', async function connection (ws) {
  setInterval(async function () {
    balance = await Database.getWalletById(10215645321).then(userWallet => { return userWallet.wallet_balance })
    ws.send(balance)
  }, 1000)
})

// Adds a transaction to the database addDeposit(int: value) is the function.
app.post('/addTrans', async (req, res) => {
    await addDeposit(parseInt(req.body.depVal))

    await Database.getUserById(currTransId)
        .then(user => { 
            lcd.updateDepositName(user.user_fname, req.body.depVal);
            console.log(`New balance is: ${balance + req.body.depVal}`);
        
            speaker.playSound(user.user_noise, user.user_volume);
            led.setLEDColour(user.user_colour);
            led.flash();

            return user;
        })
        .then(() => {
            lcd.updateBalance((balance + req.body.depVal));
            Database.getWalletById(10215645321)           
                .then(userWallet => {
                    balance = userWallet.wallet_balance
                })
        })

  res.send('complete')
})

// Endpoint for current user session, so that the client can access the session rather than using cookies.
app.get('/currSession', (req, res) => {
  res.json({ validSession: setSession, name: currUser, transactionId: currTransId })
})

// Clears session for current user.
app.post('/logout', (req, res, next) => {
  setSession = false
  currUser = ''
  res.redirect('https://pig-e-bank-web.eu.ngrok.io/')
})

// Logs in user and sets the session to the current user.
app.post('/login', (req, res, next) => {
  try {
    for (let i = 0; i < accounts.length; i++) {
      if (req.body.username === accounts[i].username && req.body.password === accounts[i].password) {
        setSession = true
        currUser = accounts[i].name
        currTransId = accounts[i].transId
        res.redirect('https://pig-e-bank-web.eu.ngrok.io/balance')
      }
    }
    res.redirect('https://pig-e-bank-web.eu.ngrok.io/')
  } catch (error) {
    console.log('don\'t mind me, just re-writing http headers. Its fine though.')
  }
})

// Contribution data collated for the savings graph.
app.get('/contribution', async (req, res) => {
  const usersFull = []
  await Database.getAllUsers()
    .then(userAccount => {
      for (let i = 0; i < userAccount.length; i++) {
        usersFull.push({ Id: userAccount[i].user_id, Name: userAccount[i].user_fname + ' ' + userAccount[i].user_sname, saved: 0 })
      }
    })

  Database.getAllTransactions()
    .then(transactionHistory => {
      for (let i = 0; i < transactionHistory.length; i++) {
        for (let x = 0; x < usersFull.length; x++) {
          if (transactionHistory[i].transaction_userId === usersFull[x].Id) {
            usersFull[x].saved = usersFull[x].saved + transactionHistory[i].transaction_value
          }
        }
      }
      res.status(200).json(usersFull)
    })
})

// Filters last four transactions, applies names to the transactions and orders.
app.get('/latestTransactions', async (req, res) => {
  const transListNames = []

  // Waits for this function to complete, iterates over all user accounts and adds only the relevant data to transListNames.
  await Database.getAllUsers()
    .then(userAccount => {
      for (let i = 0; i < userAccount.length; i++) {
        transListNames.push({ Id: userAccount[i].user_id, Name: userAccount[i].user_fname + ' ' + userAccount[i].user_sname })
      }
    })

  // Checks over transaction user id's, matches, then changes the user id to the name of the user as is more manageable.
  Database.getAllTransactions()
    .then(transactionHistory => {
      const transLen = transactionHistory.length
      const latestTrans = [transactionHistory[transLen - 1], transactionHistory[transLen - 2], transactionHistory[transLen - 3], transactionHistory[transLen - 4]]

      for (let i = 0; i < latestTrans.length; i++) {
        for (let x = 0; x < transListNames.length; x++) {
          if (latestTrans[i].transaction_userId === transListNames[x].Id) {
            latestTrans[i].transaction_userId = transListNames[x].Name
          }
        }
      }

      // If there is transaction history returns four latest transactions, if not throws error.
      if (transactionHistory) {
        res.status(200).json(latestTrans)
      } else {
        res.send('There seems to have been an error')
      }
    })
})

// Updates Settings from client using form.
app.post('/updateSett', async (req, res) => {
    console.log(req.body);
  await Database.updateSettings(currTransId, req.body.depAmount, req.body.depLimit, req.body.colour, req.body.noise, req.body.volume)
  console.log('settings updated')
  res.end()
})

// Listens for http traffic from ${port}.
const server = app.listen(port, () => {
  console.log(`server started on port: ${port}`)
})

// Upgrades server on request to change to websocket protocol.
server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request)
  })
})