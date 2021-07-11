<template>
  <section id="pocetna" class="container-fluid">
    <h1 class="display-2">Svijet Apartmana</h1>
    <p class="subheading">Pretražite najnovije oglase iz Svijeta Apartmana</p>
    <p>Osijećajte se kao doma i rezervirajte kuću, apartman ili sobu za nezaboravan odmor unutar Hrvatske!</p>
  </section>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
#pocetna {
  height: 80vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("../assets/pocetna-background.jpg") center;
  color: #F0F6F6;
}
#pocetna h1 {
  margin-bottom: 2rem;
  font-weight: 600;
}
#pocetna .subheading {
  font-size: 1.5rem;
}

@media only screen and (max-width: 966px) {
  #pocetna h1 {
    margin-bottom: 3rem;
  }
  #pocetna .subheading {
    font-size: 1.2rem;
  }
  #pocetna p {
    text-align: center;
  }
}
</style>
