class Wallet {
    constructor(id, name, depositAmount, colour, noise, depositLimit, balance){
        //All main setting and functional variables set here, this may be changed at a later date so it's a bit tidier.
        this.id = id;
        this.name = name;
        this.depositAmount = depositAmount;
        this.colour = colour;
        this.noise = noise;
        this.depositLimit = depositLimit;
        this.balance = balance;
        this.transactionHistory = [];
    }
    //Add to the running balance and also add a transaction to transaction history
    addBalance(){
        //Date setup
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        this.balance += this.depositAmount;
        this.transactionHistory.push(`${dateTime}: Transaction of (${this.depositAmount})`);
    }
}

module.exports = Wallet;