<template>
  <div class="absolute text-white text-4xl ml-24 mt-14 md:ml-52">
    <h1 class=" font-extralight">Balance Overview</h1>
    <h2 id="balance">£{{balanceSock}}</h2>
  </div>
</template>

<script>

export default {
  data () {
    return {
      balanceSock: 0
    }
  },
  mounted () {
    const connection = new WebSocket('wss://pig-e-bank-api.eu.ngrok.io/')
    connection.onmessage = (event) => {
      if (this.balanceSock != event.data) {
        const element = document.getElementById('balance')
        element.classList.add('animate-bounce')
        setTimeout(() => element.classList.remove('animate-bounce'), 550)
      }
      this.balanceSock = event.data
    }
  }
}
</script>

<style>

</style>