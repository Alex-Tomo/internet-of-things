class userAccount{
    constructor(userId, userFname, userSname, userEmail, userPassword, userWalletid, userDepositAmount,userDepositLimit, userColour, userNoise, userVolume){
        this.userId = userId
        this.userfname = userFname
        this.userSname = userSname
        this.userEmail = userEmail
        this.userPassword = userPassword
        this.userWalletId = userWalletid
        this.userDepositAmount = userDepositAmount
        this.userdepositLimit = userDepositLimit  
        this.userColour = userColour
        this.userNoise = userNoise
        this.userVolume = userVolume

    }
}

module.exports = userAccount