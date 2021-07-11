<template>
  <section id="forma">
    <form @submit.prevent="submit">
      <div class="form-control">
        <label for="nazivObjekta">Naziv Objekta:</label>
        <input type="text" id="nazivObjekta" v-model.trim="nazivObjekta">
      </div>
      <div class="form-control">
        <label for="tipObjekta">Tip objekta:</label>
        <select name="tipObjekta" id="tipObjekta" v-model.trim="tipObjekta">
          <option value="apartman">Apartman</option>
          <option value="kuca">Kuća</option>
          <option value="soba">Soba</option>
        </select>
      </div>
      <div class="form-control">
        <label for="ulica">Ulica:</label>
        <input type="text" id="ulica" v-model.trim="ulica">
      </div>
      <div class="form-control">
        <label for="grad">Grad:</label>
        <input type="text" id="grad" v-model.trim="grad">
      </div>
      <div class="form-control">
        <label for="postanskiBroj">Postanski broj:</label>
        <input type="number" id="postanskiBroj" v-model.number="postanskiBroj">
      </div>
      <div class="form-control">
        <label for="povrsinaApartmana">Povrsina apartmana u m2:</label>
        <input type="number" id="povrsinaApartmana" v-model.number="povrsinaApartmana">
      </div>
      <div class="form-control">
        <label for="brojOsoba">Maksimalni broj osoba:</label>
        <input type="number" id="brojOsoba" v-model.number="brojOsoba">
      </div>
      <div class="form-control">
        <label for="brojLezaja">Broj lezaja:</label>
        <input type="text" id="brojLezaja" v-model.number="brojLezaja">
      </div>
      <div class="form-control">
        <label for="cijenaNocenja">Cijena noćenja:</label>
        <input type="number" id="cijenaNocenja" v-model.number="cijenaNocenja">
      </div>
      <div class="form-control">
        <label for="opis">Opis:</label>
        <textarea row="4" id="opis" v-model.trim="opis"></textarea>
      </div>
      <div class="button">
        <button type="button" class="btn btn-primary">Objavi</button>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  emits: ['save-data'],
  data() {
    return {
      nazivObjekta: '',
      tipObjekta: '',
      ulica: '',
      grad: '',
      postanskiBroj: null,
      povrsinaApartmana: null,
      brojOsoba: null,
      brojLezaja: null,
      cijenaNocenja: null,
      opis: '',
      userId: ''
    };
  },
  methods: {
    // Add form validation
    submit() {
      const formData = {
        nazivObjekta: this.nazivObjekta,
        tipObjekta: this.tipObjekta,
        ulica: this.ulica,
        grad: this.grad,
        postanskiBroj: this.postanskiBroj,
        povrsinaApartmana: this.povrsinaApartmana,
        brojOsoba: this.brojOsoba,
        brojLezaja: this.brojLezaja,
        cijenaNocenja: this.cijenaNocenja,
        opis: this.opis,
        userId: this.$store.state.korisnik.user
      };

      this.$emit('save-data', formData);
    }
  }
}
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}
label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}
input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}
input,
textarea,
select {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}
input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}
input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}
input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}
h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}
.invalid label {
  color: red;
}
.invalid input,
.invalid textarea {
  border: 1px solid red;
}
#forma {
  margin-bottom: 30px;
}
#forma form .form-control {
  border: none;
}
#forma form .form-control label {
  margin: 0 0 15px 20px;
}
#forma form .form-control input, #forma form .form-control select {
  height: 40px;
  border-radius: 10px;
  padding: 0 20px;
}
#forma form .form-control textarea {
  height: 100px;
  border-radius: 10px;
  padding: 10px 20px;
}
.button button {
  display: flex;
  align-items: center;
  margin: 20px auto;
}
</style>