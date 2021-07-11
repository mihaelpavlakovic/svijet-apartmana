<template>
  <section id="profile" class="container-fluid">
    <h1 class="display-1">Profil</h1>
    <img referrerpolicy="no-referrer" :src="profile.photoURL" alt="Fotografija korisnika">
    <p>{{ profile.displayName }}</p>
    <p class="lead">{{ profile.email }}</p>
  </section>
  <section id="moji-apartmani" class="container-fluid">
  <h2>Moji Apartmani:</h2>
    <ul 
      v-for="apartman in mojiApartmani"
      :key="apartman.id"
      :id="apartman.id"
    >
      <li>
        <div>
          <h3>{{ apartman.nazivObjekta }}</h3>
          <p>{{ apartman.grad }}, {{ apartman.ulica }}</p>
        </div>
        <div class="upravljanje">
          <i @click="editApartman(apartman)" class="fas fa-pencil-alt fa-2x"></i>
          <i @click="deleteApartman(apartman.id)" class="fas fa-trash text-danger fa-2x"></i>
        </div>
      </li>
    </ul>
  </section>
  <div class="modal fade" id="edit" tabindex="-1" aria-labelledby="editLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editLabel">Uređivanje podataka:</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="form-control">
            <label for="nazivObjekta">Naziv Objekta:</label>
            <input type="text" id="nazivObjekta" v-model.trim="apartman.nazivObjekta">
          </div>
          <div class="form-control">
            <label for="tipObjekta">Tip objekta:</label>
            <select name="tipObjekta" id="tipObjekta" v-model.trim="apartman.tipObjekta">
              <option value="apartman">Apartman</option>
              <option value="kuca">Kuća</option>
              <option value="soba">Soba</option>
            </select>
          </div>
          <div class="form-control">
            <label for="ulica">Ulica:</label>
            <input type="text" id="ulica" v-model.trim="apartman.ulica">
          </div>
          <div class="form-control">
            <label for="grad">Grad:</label>
            <input type="text" id="grad" v-model.trim="apartman.grad">
          </div>
          <div class="form-control">
            <label for="postanskiBroj">Postanski broj:</label>
            <input type="number" id="postanskiBroj" v-model.number="apartman.postanskiBroj">
          </div>
          <div class="form-control">
            <label for="povrsinaApartmana">Povrsina apartmana u m2:</label>
            <input type="number" id="povrsinaApartmana" v-model.number="apartman.povrsinaApartmana">
          </div>
          <div class="form-control">
            <label for="brojOsoba">Maksimalni broj osoba:</label>
            <input type="number" id="brojOsoba" v-model.number="apartman.brojOsoba">
          </div>
          <div class="form-control">
            <label for="brojLezaja">Broj lezaja:</label>
            <input type="text" id="brojLezaja" v-model.number="apartman.brojLezaja">
          </div>
          <div class="form-control">
            <label for="cijenaNocenja">Cijena noćenja:</label>
            <input type="number" id="cijenaNocenja" v-model.number="apartman.cijenaNocenja">
          </div>
          <div class="form-control">
            <label for="opis">Opis:</label>
            <textarea row="4" id="opis" v-model.trim="apartman.opis"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button @click="updateApartman" type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '../firebase'
import {Modal} from 'bootstrap'

export default {
  name: 'Profil',
  props: ['id'],
  data() {
    return {
      profile: '',
      mojiApartmani: [],
      activeApartman: null,
      // isLoggedIn: false
      apartman: {
        nazivObjekta: null,
        tipObjekta: null,
        ulica: null,
        grad: null,
        postanskiBroj: null,
        povrsinaApartmana: null,
        brojOsoba: null,
        brojLezaja: null,
        cijenaNocenja: null,
        opis: null
      },
    }
  },
  methods: {
    editApartman(apartman) {
      var myModal = new Modal(document.getElementById('edit'))
      myModal.toggle()
      this.apartman = apartman
      // console.log(this.apartman);
      this.activeApartman = apartman.id
      // console.log(this.activeApartman);
    },
    updateApartman() {
      firebase.firestore().collection('apartmani').doc(this.activeApartman).update(this.apartman)
        .then(function() {
          console.log('Document successfully updated!');
        });
    },
    deleteApartman(apartmanId) {
      firebase.firestore().collection("apartmani").doc(apartmanId).delete().then(() => {
          console.log("Document successfully deleted!");
      }).catch((error) => {
          console.error("Error removing document: ", error);
      });
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.profile = user
        // this.isLoggedIn = true
        this.mojiApartmani = this.$store.getters['apartmani/apartmani'].find((apartman) => apartman.userId === user.uid);
        // console.log(user.uid);
        // console.log(this.mojiApartmani);
        firebase.firestore().collection("apartmani").where("userId.id", "==", user.uid)
          .onSnapshot((querySnapshot) => {
            this.mojiApartmani = [];
              querySnapshot.forEach((doc) => {
                  // console.log('log', doc);
                  // doc.data() is never undefined for query doc snapshots
                  // console.log(doc.id, " => ", doc.data());
                  const apartman = {
                      id: doc.id,
                    ...doc.data()
                  }
                  this.mojiApartmani.push(apartman)
                  // console.log(this.mojiApartmani);
              });
            // console.log('log:', this.mojiApartmani);
          })
      } else {
        this.profile = '',
        this.mojiApartmani = [],
        this.$router.replace('/apartmani');
        this.isLoggedIn = false
      }
    });
  }
}
</script>

<style scoped>
#profile {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#profile h1 {
  margin: 30px 0;
}
#profile img {
  border-radius: 20px;
  width: 150px;
  margin-bottom: 30px;
}
#profile p {
  font-size: 1.5rem;
}
#moji-apartmani {
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#moji-apartmani h2 {
  margin-bottom: 30px;
}
#moji-apartmani ul {
  list-style-type: none;
  padding: 0;
}
#moji-apartmani i {
  cursor: pointer;
}
#moji-apartmani ul li {
  width: 600px;
  height: 200px;
  margin-bottom: 30px;
  border-radius: 20px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px;
}
#moji-apartmani ul li .upravljanje i {
  margin: 0 15px;
}
.form-control {
  border: none;
  display: flex;
  align-items: center;
}
.form-control label {
  margin-right: 10px;
  width: 100%;
}
.form-control input, .form-control select {
  height: 40px;
  width: 100%;
  border-radius: 10px;
  padding: 0 20px;
}
.form-control textarea {
  height: 100px;
  width: 200%;
  border-radius: 10px;
  padding: 10px 20px;
}
@media only screen and (max-width: 966px) {
  #moji-apartmani ul li {
    width: 310px;
    height: 200px;
    margin-bottom: 30px;
    padding: 0 20px;
  }
  #moji-apartmani ul li .upravljanje {
    display: flex;
    flex-direction: column;
  }
  #moji-apartmani ul li .upravljanje i {
    margin: 10px 0;
  }
}
</style>