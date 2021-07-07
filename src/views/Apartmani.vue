<template>
  <h1>Lista svih apartmana</h1>
  <ul v-if="sadrziApartmane">
    <apartmani-kartica
      v-for="apartman in filtriraniApartmani"
      :key="apartman.id"
      :id="apartman.id"
      :nazivObjekta="apartman.nazivObjekta"
      :grad="apartman.grad"
    >
    </apartmani-kartica>
  </ul>
  <h3 v-else>Nema pronađenih apartmana.</h3>
</template>

<script>
import ApartmaniKartica from '../components/apartmani/ApartmanKartica.vue'

export default {
  components: {
    ApartmaniKartica
  },
  computed: {
    filtriraniApartmani() {
      return this.$store.getters['apartmani/apartmani']
    },
    sadrziApartmane() {
      return this.$store.getters['apartmani/sadrziApartmane']
    }
  },
  methods: {
    async ucitajApartmane() {
      await this.$store.dispatch('apartmani/ucitajApartmane');
    }
  },
  created() {
    this.ucitajApartmane();
  }
}
</script>