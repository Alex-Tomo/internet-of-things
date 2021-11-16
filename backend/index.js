const { checkCard } = require('./read')
const Wallet = require('./digital-wallet')
const express = require('express')
const cors = require('cors')

// Create and instance of express and capture port number.
const app = express()
const port = 8080

// for testing purposes we will have a wallet creation page at login
const walletOne = new Wallet('10215645321', 'Person 1', 50, 1, 2, 200, 500)
const walletList = [walletOne]

app.use('/', express.static('./src'))
app.use(express.json())
app.use(cors())

setInterval(() => {
  flag = checkCard()
  if (flag) {
    walletOne.addBalance()
    console.log(`New balance is: ${walletOne.balance}`)
    sleep(5000)
  }
}, 500)

// Prints list of all instantiated wallets
app.get('/wallets', (req, res) => { res.json({ walletList }) })

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
      res.end('Settings Updated')
    }
  }
  // Error checking to ensure the endpoint produces an output.
  if (error !== false) res.end('Whoops!, You must have entered the incorrect WalletID')
})

// Listens for http traffic from ${port}
app.listen(port, () => { console.log(`server started on port: ${port}`) })