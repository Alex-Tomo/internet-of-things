<template>
  <h1 class="text-transaction-grey text-3xl ml-9 mt-10 mb-7 tracking-wide text-center">Login</h1>
  <div class="flex justify-center mt-10">
    <form class="w-full max-w-sm" action="https://pig-e-bank-api.eu.ngrok.io/login" method="POST">
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label class="block text-transaction-grey font-bold md:text-right mb-1 md:mb-0 pr-4" for="username"> Username </label>
        </div>
        <div class="md:w-2/3">
          <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-transaction-grey leading-tight focus:outline-none focus:bg-white focus:border-stand-pink-dark" id="username" name="username" type="text" placeholder="Username">
        </div>
      </div>
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label class="block text-transaction-grey font-bold md:text-right mb-1 md:mb-0 pr-4" for="password"> Password </label>
        </div>
        <div class="md:w-2/3">
          <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-transaction-grey leading-tight focus:outline-none focus:bg-white focus:border-stand-pink-dark" id="password" name="password" type="password" placeholder="******************">
        </div>
      </div>
      <div class="md:flex md:items-center">
        <div class="md:w-1/3"></div>
        <div class="md:w-2/3">
          <input class="shadow bg-gradient-to-r from-stand-pink-dark to-stand-pink-light hover:bg-stand-green focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" value="Login" type="submit">
        </div>
      </div>
    </form>
  </div>
</template>
<script>

export default {}
</script>

<style>

</style>