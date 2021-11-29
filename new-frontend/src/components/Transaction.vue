<template>
  <div class="grid grid-cols-4 w-full text-transaction-grey text-xl tracking-wide mb-8">
    <div class="text-center pt-2">
      {{date}}
    </div>

    <div class="justify-self-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 9a2 2 0 10-4 0v5a2 2 0 01-2 2h6m-6-4h4m8 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <div class="text-center col-span-2 pt-2"> £{{deposit}} Deposited by: {{name}}
    </div>
  </div>
</template>

<script>

export default {
    props: ['name', 'date', 'deposit']
}

</script>

<style>

</style>