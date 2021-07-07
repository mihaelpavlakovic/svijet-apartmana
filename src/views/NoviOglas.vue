<template>
  <h2>Kreiranje Oglasa</h2>
  <section>
    <apartmani-forma @save-data="saveData"></apartmani-forma>
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