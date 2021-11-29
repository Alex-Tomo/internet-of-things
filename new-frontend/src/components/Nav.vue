<template>
  <div class="bg-gradient-to-r from-stand-pink-dark to-stand-pink-light">
    <div class="w-full h-16">
      <div class="flex justify-start absolute">
        <svg @click="isVisible = !isVisible" xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 m-3 text-white md:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 6h16M4 12h16M4 18h7" />
        </svg>
        <div class="hidden md:flex mt-2 ml-3 text-white text-xl">
          <router-link v-if="validSession === true" class="p-2 hover:bg-stand-pink-light rounded" to="/balance">Home</router-link>
          <router-link v-if="validSession === false" class="p-2 hover:bg-stand-pink-light rounded" to="/">Login</router-link>
          <router-link v-if="validSession === true" @click="logoutClick()" class="p-2 hover:bg-stand-pink-light rounded" to="/">Logout</router-link>
        </div>
      </div>
      <div v-if="validSession === true" class="flex justify-end">
        <router-link @click="settingsNav()" class="mb-8" to="/settings">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 m-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </router-link>
      </div>
    </div>
    <div v-if="isVisible" class="flex flex-col text-center z-10 text-white text-2xl bg-gradient-to-r from-stand-pink-dark to-stand-pink-light absolute w-full fade-in">
      <router-link v-if="validSession === true" @click="isVisible = !isVisible" class="mb-8" to="/balance">Home</router-link>
      <router-link v-if="validSession === false" @click="isVisible = !isVisible" class="mb-8" to="/">Login</router-link>
      <router-link v-if="validSession === true" @click="isVisible = !isVisible" class="mb-8" to="/">Logout</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data () {
    return {
      isVisible: false,
      validSession: false
    }
  },
  methods: {
    settingsNav () {
      if (this.isVisible === true) {
        this.isVisible = false
      }
    },
    logoutClick () {
      axios.post('https://pig-e-bank-api.eu.ngrok.io/logout')
    }
  },
  mounted () {
    axios.get('https://pig-e-bank-api.eu.ngrok.io/currSession').then(resp => { this.validSession = resp.data.validSession })
  }
}
</script>

<style>
.fade-in{
  animation: fadein 0.8s;
}

@keyframes fadein {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>