<template>
  <li>
    <h3>{{ nazivObjekta }}</h3>
    <h4>{{ grad }}, {{ ulica }}</h4>
    <div class="actions">
      <router-link :to="detaljiApartmanaLink">
        <button type="button" class="btn btn-color grow">Više</button>
      </router-link>
    </div>
  </li>
</template>

<script>
export default {
  props: ['id', 'nazivObjekta', 'grad', 'ulica'],
  computed: {
    detaljiApartmanaLink() {
      return this.$route.path + '/' + this.id;
    }
  }
}
</script>

<style scoped>
button {
    margin-top: 20px;
}
.btn {
  width: 100px;
}
.btn-color {
  background-color: #FAA381;
  color: #FFF;
}
.grow {
  transition: all .2s ease-in-out;
  }
.grow:hover {
  transform: scale(1.1);
  background-color: #FF9966;
  color: #FFF;
}
@media only screen and (max-width: 966px) {
  button {
    margin-top: 20px;
  }
}
</style>