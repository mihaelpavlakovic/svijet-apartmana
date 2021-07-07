<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Svijet Apartmana</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <div class="d-flex align-items-center" v-if="isLoggedIn">
          <p>{{ user.name }}</p>
          <img id="profile-image" referrerpolicy="no-referrer" :src="user.image" alt="User image">
        </div>
        <span class="navbar-toggler-icon" v-else></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Početak</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/apartmani">Apartmani</router-link>
          </li>
          <div v-if="!isLoggedIn">
            <li class="nav-item">
              <a class="nav-link" @click="googleSignIn">Prijava</a>
            </li>
          </div>
          <div v-else>
            <li class="nav-item">
              <router-link class="nav-link" to="/profil">Profil</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/novi-oglas">Kreiraj Oglas</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="googleSignOut">Odjava</a>
            </li>
          </div>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
// import firebase from '../../firebase.js';
// import { mapActions } from 'vuex'
// import { mapState } from 'vuex'

export default {
  methods: {
    googleSignIn() {
      this.$store.dispatch('korisnik/login')
    },
    googleSignOut() {
      this.$store.dispatch('korisnik/logout')
    }
    // googleSignIn() {
    //   let provider = new firebase.auth.GoogleAuthProvider();
    //   firebase.auth()
    //     .signInWithPopup(provider)
    //     .then((result) => {
    //       var credential = result.credential;

    //       // This gives you a Google Access Token. You can use it to access the Google API.
    //       var token = credential.accessToken;
    //       console.log(token)
    //       // The signed-in user info.
    //       var user = result.user;
    //       console.log(user)
    //       this.isLoggedIn = true;
    //     }).catch((error) => {
    //       // Handle Errors here.
    //       console.log(error)
    //     });
    //   firebase.auth().onAuthStateChanged(user => {
    //     if (user) {
    //       // Korisnik je ulogiran
    //       const setUser = {
    //         id: user.uid,
    //         name: user.displayName,
    //         email: user.email,
    //         image: user.photoURL,
    //         createdAt: firebase.firestore.FieldValue.serverTimestamp()
    //       };
    //       // Zapisivanje ulogiranog korisnika u bazu podataka
    //       // users je ime kolekcije, dok je svaki zapis u toj kolekciji specifican id od svakog usera
    //       firebase.firestore().collection('users').doc(setUser.id).set(setUser);
    //       this.user = setUser;
    //     } else {
    //       // Korisnik nije ulogiran
    //     }
    //   });
    // },
    // googleSignOut() {
    //   firebase.auth()
    //     .signOut()
    //     .then(() => {
    //       this.isLoggedIn = false;
    //     });
    // }
    
  },
  computed: {
    // korisnik: mapState('korisnik', ['user', 'isLoggedIn'])
    isLoggedIn() {
      return this.$store.state.korisnik.isLoggedIn;
    },
    user() {
      return this.$store.state.korisnik.user;
    }
  }
}
</script>

<style scoped>
p {
  margin: 0;
  padding-right: 10px;
}
a {
  cursor: pointer;
}
button {
  border: none;
}
#profile-image {
  height: 50px;
  width: auto;
  border-radius: 10px;
}
</style>