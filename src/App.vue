<template>
  <the-header></the-header>
  <router-view/>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue'

export default {
  components: {
    TheHeader
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700&display=swap');

body {
  font-family: Poppins, sans-serif;
}
</style>