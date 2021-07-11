<template>
  <section id="oglas" class="container-fluid">
    <h1 class="text-center">Kreiranje Oglasa</h1>
    <section>
      <apartmani-forma @save-data="saveData"></apartmani-forma>
    </section>
  </section>
</template>

<script>
import ApartmaniForma from '../components/apartmani/ApartmaniForma.vue';

export default {
  components: {
    ApartmaniForma
  },
  methods: {
    saveData(data) {
      this.$store.dispatch('apartmani/noviApartman', data);
      // povratak na prikaz svih apartmana (izmijeniti kasnije)
      this.$router.replace('/apartmani');
    }
  }
}
</script>

<style scoped>
#oglas {
  width: 60%;
  margin-top: 50px;
}
#oglas h1 {
  margin-bottom: 30px;
}
@media only screen and (max-width: 966px) {
  #oglas {
  width: 100%;
  margin-top: 30px;
}
}
</style>