
const knex = require('knex');
const config = require('./knexfile');
const db = knex(config.development);

function getAllWallets(){
    return db("userWallet");
};

function getWalletById(id){
    return db("userWallet")
    .where( 'wallet_id', id )
    .first();
}

function getAllUsers(){
    return db("userAccount");
};


function getUserById(userId){
    return db("userAccount")
    .where('user_id', userId)
    .first();
};

function getAllTransactions(){
    return db("transactionHistory");
};

function getTransactionsById(userId){
    return db("transactionHistory")
    .where("transaction_userId" , userId)
    .first();
};

//will add this later
function resetBalance(){
    db()
}

async function addTransactionHistory(id, userId, value){
    db("transactionHistroy").insert([{transaction_walletId: id}, 
        {transaction_userId : userId}, 
        {transaction_value : value}])
        ;
    
};

async function updateUserSettings(userId, userDepositAmount, userDepositLimit, userColour, userNoise, userVolume){
    db("userAccount")
        .where({user_id : userId})
        .update({user_depositAmmount: userDepositAmount}, 
        {user_depositLimit : userDepositLimit}, 
        {user_colour : userColour},
        {user_noise : userNoise},
        {user_volume : userVolume}
        );
    
};


async function updateBalance(id, balance){
    db("userWallet")
        .where({wallet_id : id})
        .update({wallet_balance: balance}
        );
    
};


module.exports = {
    getAllWallets,
    getAllTransactions,
    getAllUsers,
    getWalletById,
    getUserById,
    getTransactionsById,
    addTransactionHistory,
    updateUserSettings,
    updateBalance

}