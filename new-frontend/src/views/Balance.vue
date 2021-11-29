<template>
  <div class="">
      <div class="flex flex-row tracking-wide">
      <Balance />
      <BalanceOver />
      
      </div>
      <h1 class="text-transaction-grey text-2xl tracking-wide text-center mt-7">Welcome Back: {{username}}</h1>
      <div class="flex justify-center mt-5">
        <button @click="depositAmount()" class="shadow bg-gradient-to-r from-stand-pink-dark to-stand-pink-light hover:bg-stand-green focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
    Deposit</button>
  <input v-model="depositAdd" name="deposit-amount" id="deposit-amount" class="border-2 border-gray-200 rounded text-transaction-grey leading-tight focus:outline-none focus:bg-white focus:border-stand-pink-dark" type="number">
      </div>
      <div class="md:hidden text-transaction-grey text-2xl mt-7 mb-7 tracking-wide text-center">
      <h1>Transaction History</h1>
      <Transaction :name="namesPass[0]" :date="datePass[0]" :deposit="depositPass[0]"/>
      <Transaction :name="namesPass[1]" :date="datePass[1]" :deposit="depositPass[1]"/>
      <Transaction :name="namesPass[2]" :date="datePass[2]" :deposit="depositPass[2]"/>
      <Transaction :name="namesPass[3]" :date="datePass[3]" :deposit="depositPass[3]"/>
      <h1 class="text-transaction-grey text-2xl text-center mt-7 mb-7 tracking-wide">Saving Contributions</h1>
      <Savinggraph />
      </div>

  <div class="hidden md:grid grid-cols-2">
    <div>
      <h1 class="text-transaction-grey text-2xl text-center mt-7 mb-7 tracking-wide">Transaction History</h1>
      
      <Transaction :name="namesPass[0]" :date="datePass[0]" :deposit="depositPass[0]"/>
      <Transaction :name="namesPass[1]" :date="datePass[1]" :deposit="depositPass[1]"/>
      <Transaction :name="namesPass[2]" :date="datePass[2]" :deposit="depositPass[2]"/>
      <Transaction :name="namesPass[3]" :date="datePass[3]" :deposit="depositPass[3]"/>
    </div>
    <div>
      <h1 class="text-transaction-grey text-2xl text-center mt-7 mb-7 tracking-wide">Saving Contributions</h1>
      <Savinggraph />
    </div>
  </div>

  </div>

</template>

<script>
import Balance from '@/components/Balance.vue'
import BalanceOver from '@/components/BalanceOver.vue'
import Transaction from '@/components/Transaction.vue'
import Savinggraph from '@/components/Savinggraph.vue'

import axios from 'axios';

export default {
  data () {
    return {
      namesPass: [],
      datePass: [],
      depositPass: [],
      username: '',
      depositAdd: 0
    }
  },
  components: {
    Balance,
    BalanceOver,
    Transaction,
    Savinggraph
  },
  methods: {
    depositAmount () {
      let depnow = { depVal: this.depositAdd }
      axios.post('https://pig-e-bank-api.eu.ngrok.io/addTrans', depnow)
    }
  },
  async mounted () {
    axios.get('https://pig-e-bank-api.eu.ngrok.io/currSession').then(resp => { this.username = resp.data.name })
    for (let i = 0; i < 4; i++) {
      await axios.get('https://pig-e-bank-api.eu.ngrok.io/latestTransactions').then(resp => { this.namesPass.push(resp.data[i].transaction_userId) })
      await axios.get('https://pig-e-bank-api.eu.ngrok.io/latestTransactions').then(resp => { this.datePass.push(resp.data[i].transaction_date) })
      await axios.get('https://pig-e-bank-api.eu.ngrok.io/latestTransactions').then(resp => { this.depositPass.push(resp.data[i].transaction_value) })
    }
  }
}

</script>

<style>

</style>