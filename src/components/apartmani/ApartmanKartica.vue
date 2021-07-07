<template>
  <li>
    <h3>{{ nazivObjekta }}</h3>
    <h4>{{ grad }}</h4>
    <div class="actions">
      <router-link :to="detaljiApartmanaLink">Vise</router-link>
    </div>
  </li>
</template>

<script>
export default {
  props: ['id', 'nazivObjekta', 'grad'],
  computed: {
    detaljiApartmanaLink() {
      return this.$route.path + '/' + this.id;
    }
  }
}
</script>