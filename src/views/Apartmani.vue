<template>
  <section id="prikaz-apartmana" class="container-fluid">
    <h1>Lista svih apartmana</h1>
    <ul v-if="sadrziApartmane">
      <apartmani-kartica
        v-for="apartman in filtriraniApartmani"
        :key="apartman.id"
        :id="apartman.id"
        :nazivObjekta="apartman.nazivObjekta"
        :grad="apartman.grad"
        :ulica="apartman.ulica"
      >
      </apartmani-kartica>
    </ul>
    <h3 v-else>Nema pronađenih apartmana.</h3>
  </section>
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
    ucitajApartmane() {
      this.$store.dispatch('apartmani/ucitajApartmane');
    }
  },
  created() {
    this.ucitajApartmane();
  }
}
</script>

<style scoped>
#prikaz-apartmana {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#prikaz-apartmana h1 {
  margin: 100px 0;
}
#prikaz-apartmana ul {
  list-style-type: none;
  padding: 0;
}
#prikaz-apartmana ul li {
  width: 600px;
  height: 200px;
  margin-bottom: 30px;
  border-radius: 20px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#prikaz-apartmana ul li h3 {
  font-weight: bold;
}
#prikaz-apartmana ul li h4 {
  margin-bottom: 20px;
}
@media only screen and (max-width: 966px) {
  #prikaz-apartmana h1 {
    margin: 30px 0;
  }
  #prikaz-apartmana ul li {
    width: 300px;
    height: 200px;
    margin-bottom: 30px;
  }
}
</style>