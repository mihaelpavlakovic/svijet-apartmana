<template>
  <h1>Detalji jednog apartmana.</h1>
  <section>
    <h2>{{ odabraniApartman.nazivObjekta }}</h2>
    <h3>{{ odabraniApartman.ulica }}, {{ odabraniApartman.grad }}, {{ odabraniApartman.postanskiBroj }}</h3>
    <p>{{ odabraniApartman.cijenaNocenja }} €/noć</p>
    <p>Povrsina apartmana: {{ odabraniApartman.povrsinaApartmana }} m2</p>
    <p>Broj osoba: {{ odabraniApartman.brojOsoba }}</p>
    <p>Broj lezaja: {{ odabraniApartman.brojLezaja }}</p>
    <p>Opis:</p>
    <p>{{ odabraniApartman.opis }}</p>
  </section>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      odabraniApartman: null
    }
  },
  created() {
    this.odabraniApartman = this.$store.getters['apartmani/apartmani'].find((apartman) => apartman.id === this.id);
    console.log(this.$store.getters['apartmani/apartmani']);
  },
}
</script>