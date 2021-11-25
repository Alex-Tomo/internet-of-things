class transactionHistory{
    constructor(transactionId, tWalletId, tUserId, tValue, tDate){
        this.transactionId = transactionId
        this.tWalletId = tWalletId
        this.tUsertId = tUserId
        this.tValue = tValue
        this.tDate = tDate
    }
}

module.exports = transactionHistory