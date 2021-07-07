// import { useContext } from 'vue';
import firebase from '../../firebase.js';

export default {
  namespaced: true,
  state() {
    return {
      user: {},
      isLoggedIn: false
    }
  },
  actions: {
    async login(context) {
      const provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithPopup(provider);

      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          if(user.user) {
            user = user.user;
          }
          const setUser = {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            image: user.photoURL,
            created_at: firebase.firestore.FieldValue.serverTimestamp()
          };
          firebase.firestore().collection('users').doc(setUser.id).set(setUser);
          // Korisnik je ulogiran
          context.commit('setUser', setUser)
        } else {
          // Korisnik nije ulogiran
          context.commit('setUser', null)
        }
      })
    },
    async logout() {
      await firebase.auth().signOut();
    },
      // firebase.auth().onAuthStateChanged(user => {
      //   if (user) {
      //     // Korisnik je ulogiran
      //     const setUser = {
      //       id: user.uid,
      //       name: user.displayName,
      //       email: user.email,
      //       image: user.photoURL,
      //       createdAt: firebase.firestore.FieldValue.serverTimestamp()
      //     };
      //     // Zapisivanje ulogiranog korisnika u bazu podataka
      //     // users je ime kolekcije, dok je svaki zapis u toj kolekciji specifican id od svakog usera
      //     firebase.firestore().collection('users').doc(setUser.id).set(setUser);
      //     this.user = setUser;
      //   } else {
      //     // Korisnik nije ulogiran
      //   }
        
      // });

    // },
    // googleSignOut() {
    //   firebase.auth()
    //     .signOut()
    // }
  },
  mutations: {
    setUser(state, user) {
      if(user) {
        state.user = user;
        state.isLoggedIn = true;
      } else {
        state.user = {};
        state.isLoggedIn = false;
      }
    }
  },
  getters: {
    korisnik(state) {
      return state.korisnik;
    },
  }
}