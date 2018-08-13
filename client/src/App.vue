<template>
  <v-app>
    <navbar></navbar>
    <router-view></router-view>
  </v-app>
</template>

<style lang="css" scoped>

</style>

<script>
import Navbar from '@/components/Navbar'
export default {
  name: 'App',
  components: {
    Navbar
  },
  data: () => ({
  })
}
</script>
