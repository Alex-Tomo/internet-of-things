
const knex = require('knex')
const config = require('./knexfile')
const db = knex(config.development)

function getAllWallets () {
  return db('userWallet')
};

function getWalletById (id) {
  return db('userWallet')
    .where('wallet_id', id)
    .first()
}

function getAllUsers () {
  return db('userAccount')
};

function getUserById (userId) {
  return db('userAccount')
    .where('user_id', userId)
    .first()
};

function getAllTransactions () {
  return db('transactionHistory')
};

function getTransactionsById (userId) {
  return db('transactionHistory')
    .where('transaction_userId', userId)
    .first()
};

/*
Added this functionality to add a transaction, this is the correct way to add to the sqlite database
Ref: https://knexjs.org/#Builder-insert
*/

async function addTrans (post) {
  return db('transactionHistory')
    .insert(post)
    .then(transaction_walletId => ({ id: transaction_walletId[0] }))
};

// Adds to the wallets balance, addition performed before db update
async function addToWallet (value) {
  return db('userWallet')
    .where({ wallet_id: 10215645321 })
    .update({ wallet_balance: value }, ['wallet_id', 'wallet_balance'])
}

// Updates the settings from a user id "kinda not really"
async function updateSettings (id, depAmount, depLimit, colour, noise, volume) {
  return db('userAccount')
    .where({ user_id: id })
    .update({ user_depositAmmount: depAmount, user_depositLimit: depLimit, user_colour: colour, user_noise: noise, user_volume: volume })
}

async function addTransactionHistory (id, userId, value) {
  db('transactionHistory').insert({ transaction_walletId: id },
    { transaction_userId: userId },
    { transaction_value: value })
};

async function updateBalance (id, balance) {
  db('userWallet')
    .where({ wallet_id: id })
    .update({ wallet_balance: balance }
    )
};

module.exports = {
  getAllWallets,
  getAllTransactions,
  getAllUsers,
  getWalletById,
  getUserById,
  getTransactionsById,
  addTransactionHistory,
  updateBalance,
  addTrans,
  addToWallet,
  updateSettings
}