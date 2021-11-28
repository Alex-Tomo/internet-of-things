<template>
  <Nav />
  <router-view/>
</template>

<script>
import Nav from '@/components/Nav.vue'

export default {
  components: {
    Nav
  },
  watch: {
    $route: {
      immediate: true,
      handler (to) {
        document.title = to.meta.title || 'Pig-E-Bank'
      }
    }
  }
}

</script>

<style>

</style>