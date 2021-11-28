<template>
  <div>
    <Login />
  </div>
</template>

<script>
import Login from '@/components/Login.vue'
export default {
  name: 'Home',
  components: {
    Login       
  },
  mounted () {
    // Reloads the page in order to update navbar functionality
    if (localStorage.getItem('reloaded')) {
      localStorage.removeItem('reloaded')
    } else {
      localStorage.setItem('reloaded', '1')
      location.reload();
    }
  }
}
</script>
