<template>
  <section class=" ml-28 mr-28">
    <h1 class="text-center text-transaction-grey text-3xl mt-10">Settings</h1>
    <br>
    <label class="text-transaction-grey font-bold md:text-right mb-1 md:mb-0 pr-4" for="name">Wallet Name</label>
    <br>
    <input v-model="name" type="text" id="name" name="name" class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
    <br>
    <label class="text-transaction-grey font-bold md:text-right mb-1 md:mb-0 pr-4" for="dep-amount">Deposit Amount</label>
    <br>
    <input v-model="depositAmount" type="number" id="dep-amount" name="dep-amount" class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
    <br>
    <label class="text-transaction-grey font-bold md:text-right mb-1 md:mb-0 pr-4" for="colours-form">LED Colour</label>
    <br>
    <div class="inline-block" id="colours-form">
      <div v-on:click="colour = 0" id="colour0" class="sound-square bg-blue-300 border-2 hover:border-gray-600 focus: ring-black"></div>
      <div v-on:click="colour = 1" id="colour1" class="sound-square bg-purple-600 border-2 hover:border-gray-600 focus:border-gray-600"></div>
      <div v-on:click="colour = 2" id="colour2" class="sound-square bg-yellow-300 border-2 hover:border-gray-600 focus:border-gray-600"></div>
      <div v-on:click="colour = 3" id="colour3" class="sound-square bg-blue-600 border-2 hover:border-gray-600 focus:border-gray-600"></div>
      <div v-on:click="colour = 4" id="colour4" class="sound-square bg-green-500 border-2 hover:border-gray-600 focus:border-gray-600"></div>
      <div v-on:click="colour = 5" id="colour5" class="sound-square bg-red-600 border-2 hover:border-gray-600 focus:border-gray-600"></div>
      <div v-on:click="colour = 6" id="colour6" class="sound-square bg-white border-2 hover:border-gray-600 focus:border-gray-600"></div>
      <div v-on:click="colour = 7" id="colour7" class="sound-square bg-gray-400 border-2 hover:border-gray-600 focus:border-black"></div>
    </div>
    <br>
    <br>
    <label class="text-transaction-grey font-bold md:text-right mb-1 md:mb-0 pr-4" for="sounds">Sounds</label>
    <br>
    <div class="inline-block relative w-64">
      <select v-model="noise" name="sounds" class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
        <option v-bind:value="0">Oink</option>
        <option v-bind:value="1">Squeel</option>
        <option v-bind:value="2">Fart 1</option>
        <option v-bind:value="3">Fart 2</option>
        <option v-bind:value="4">Coin Drop 1</option>
        <option v-bind:value="5">Coin Drop 2</option>
        <option v-bind:value="6">Laugh 1</option>
        <option v-bind:value="7">Laugh 2</option>
        <option v-bind:value="8">Mute</option>
      </select>
    </div>
    <br>
    <br>
    <label class="text-transaction-grey font-bold md:text-right mb-1 md:mb-0 pr-4" for="volume">Volume:</label>
    <input name="volume" type="range" min="0" max="100" v-model="volume">
    <br>
    <br>
    <label class="text-transaction-grey font-bold md:text-right mb-1 md:mb-0 pr-4" for="dep-limit">Deposit Limit</label>
    <br>
    <input v-model="depositLimit" type="number" id="dep-limit" name="dep-limit" class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
    <br>
    <button v-on:click="applySettings()" class="bg-gradient-to-r from-stand-pink-dark to-stand-pink-light text-white font-bold py-2 px-4 rounded"> Apply </button>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  name: 'settings',
  data () {
    return {
      name: 'Current',
      colour: 0,
      depositAmount: 0,
      noise: 0,
      volume: 0,
      depositLimit: 0,
      colourButtonState: 0
    }
  },
  methods: {
    applySettings: async function () {
      let dataSend = {
        id: 0,
        depAmount: this.depositAmount,
        depLimit: this.depositLimit,
        colour: this.colour,
        noise: parseInt(this.noise),
        volume: parseInt(this.volume)
      }
      await axios.get('https://pig-e-bank-api.eu.ngrok.io/currSession').then(resp => dataSend.id = resp.data.transactionId)
      await axios.post('https://pig-e-bank-api.eu.ngrok.io/updateSett', dataSend)
    }
  }
}

</script>

<style>
.sound-square{
  height: 50px;
  width: 50px;
  margin-right: 2px;
  display: inline-block;
  border-radius: 5px;
}
</style>