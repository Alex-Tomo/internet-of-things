class Wallet {
    constructor (id, name, depositAmount, colour, noise, depositLimit, balance) {
      // All main setting and functional variables set here.
      this.id = id
      this.name = name
      this.depositAmount = depositAmount
      this.colour = colour
      this.noise = noise
      this.depositLimit = depositLimit
      this.balance = balance
      this.transactionHistory = []
    }
  
    // Add to the running balance and also add a transaction to transaction history.
    addBalance () {
      this.balance += this.depositAmount
      this.addTransaction()
    }

    addSpecificBalance (amount) {
      this.balance += amount
      this.addTransaction()
    }
  
    // Add transaction to transaction history
    addTransaction () {
      // Date setup
      const today = new Date()
      const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
      const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
      const dateTime = date + ' ' + time
  
      this.transactionHistory.push(`${dateTime}: Transaction of (${this.depositAmount})`)
    }
  }
  
  module.exports = Wallet