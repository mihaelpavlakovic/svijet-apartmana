<template>
  <section id="apartmani-detaljno" class="container-fluid text-center">
    <h1 class="display-1">{{ odabraniApartman.nazivObjekta }}</h1>
    <h2>{{ odabraniApartman.ulica }}, {{ odabraniApartman.grad }}, {{ odabraniApartman.postanskiBroj }}</h2>
    <p>Cijena najma: {{ odabraniApartman.cijenaNocenja }} €/noć</p>
    <p>Povrsina apartmana: {{ odabraniApartman.povrsinaApartmana }} m2</p>
    <p>Broj osoba: {{ odabraniApartman.brojOsoba }}</p>
    <p>Broj lezaja: {{ odabraniApartman.brojLezaja }}</p>
    <p>Opis:</p>
    <p>{{ odabraniApartman.opis }}</p>
    <div class="d-flex align-items-center button">
      <a @click="$router.go(-1)" class="btn btn-primary">
        <i class="fas fa-long-arrow-alt-left"></i>
        Povratak
      </a>
    </div>
  </section>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      odabraniApartman: {}
    }
  },
  methods: {
    ucitajApartman() {
      // console.log(this.$store.getters['apartmani/apartmani'].find(apartman));
      this.odabraniApartman = this.$store.getters['apartmani/apartmani'].find((apartman) => apartman.id === this.id);
    }
  },
  created() {
    this.ucitajApartman();
    // console.log(this.id);
  },
}
</script>

<style scoped>
a {
  cursor: pointer;
}
.btn {
  width: 150px;
  height: 50px;
}
.button {
    margin-top: 30px;
}
#apartmani-detaljno {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
}
#apartmani-detaljno h2 {
  margin: 30px 0;
}
</style>