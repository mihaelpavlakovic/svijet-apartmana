/* import firebase from '../../firebase.js'

export default {
  namespaced: true,
  state() {
    return {
      apartmani: [
        // {
        //   id: 'a1',
        //   nazivObjekta: 'Apartmani Veli Luka',
        //   tipObjekta: 'apartman',
        //   ulica: 'Donja Svarca 25e',
        //   grad: 'Karlovac',
        //   postanskiBroj: '47000',
        //   povrsinaApartmana: '120',
        //   brojOsoba: '2',
        //   brojLezaja: '1',
        //   cijenaNocenja: '45',
        //   opis: "Iznajmljujem povoljan apartman za sve informacije zovite na broj mobitela!"
        // },
        // {
        //   id: 'a2',
        //   nazivObjekta: 'Stan u Rijeci',
        //   tipObjekta: 'stan',
        //   ulica: 'Maksimilijana Vrhovca 19',
        //   grad: 'Rijeka',
        //   postanskiBroj: '51000',
        //   povrsinaApartmana: '62',
        //   brojOsoba: '4',
        //   brojLezaja: '2',
        //   cijenaNocenja: '22',
        //   opis: "Iznajmljujem povoljan stan u Rijeci pogodan za studente."
        // }
      ],
    }
  },
  mutations: {
    noviApartman(state, payload) {
      state.apartmani.push(payload);
    },
    postaviApartmane(state, payload) {
      state.apartmani = payload;
    },
  },
  actions: {
    noviApartman(context, data) {
      const apartmanId = firebase.firestore().collection('apartmani').doc();
      const podatciApartmana = {
          userId: context.rootGetters.userId,
          nazivObjekta: data.nazivObjekta,
          tipObjekta: data.tipObjekta,
          ulica: data.ulica,
          grad: data.grad,
          postanskiBroj: data.postanskiBroj,
          povrsinaApartmana: data.povrsinaApartmana,
          brojOsoba: data.brojOsoba,
          brojLezaja: data.brojLezaja,
          cijenaNocenja: data.cijenaNocenja,
          opis: data.opis
      }

      apartmanId.set({
        ...podatciApartmana
      }).then(() => {
        console.log("Document seccessfully written!");
      }).catch((error) => {
        console.log(error);
      })

      context.commit('noviApartman', {
        ...podatciApartmana,
        apartmanId: apartmanId
      });
    },
    ucitajApartmane(context) {
      // const apartmanId = context.rootGetters.apartmanId;
      firebase.firestore().collection("apartmani").get().then((querySnapshot) => {
        const apartmani = [];
        querySnapshot.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            const apartman = {
              id: doc.id,
              ...doc.data()
            };
            console.log('Apartman:',apartman)
            apartmani.push(apartman)

          });
          context.commit('postaviApartmane', apartmani);
          console.log('Apartmani:', apartmani);
        });
      // var docRef = firebase.firestore().collection("apartmani");
      // console.log(docRef);

      // docRef.get().then((doc) => {
      //     if (doc.exists) {
      //       const apartmani = [];
      //       for (const key in doc) {
      //         const apartman = {
      //           userId: doc[key].userId,
      //           nazivObjekta: doc[key].nazivObjekta,
      //           tipObjekta: doc[key].tipObjekta,
      //           ulica: doc[key].ulica,
      //           grad: doc[key].grad,
      //           postanskiBroj: doc[key].postanskiBroj,
      //           povrsinaApartmana: doc[key].povrsinaApartmana,
      //           brojOsoba: doc[key].brojOsoba,
      //           brojLezaja: doc[key].brojLezaja,
      //           cijenaNocenja: doc[key].cijenaNocenja,
      //           opis: doc[key].opis
      //         };
      //         apartmani.push(apartman)
      //       }

      //       context.commit('postaviApartmane', apartmani);
      //       console.log("Document data:", doc.data());
      //     } else {
      //       // doc.data() will be undefined in this case
      //       console.log("No such document!");
      //     }
      // }).catch((error) => {
      //     console.log("Error getting document:", error);
      // });
    }
  },
  getters: {
    apartmani(state) {
      return state.apartmani;
    },
    // Provjeravamo da li postoje apartmani u listi
    sadrziApartmane(state) {
      return state.apartmani && state.apartmani.length > 0;
    }
  }
} */
import firebase from '../../firebase.js'

export default {
  namespaced: true,
  state() {
    return {
      apartmani: [
        // {
        //   id: 'a1',
        //   nazivObjekta: 'Apartmani Veli Luka',
        //   tipObjekta: 'apartman',
        //   ulica: 'Donja Svarca 25e',
        //   grad: 'Karlovac',
        //   postanskiBroj: '47000',
        //   povrsinaApartmana: '120',
        //   brojOsoba: '2',
        //   brojLezaja: '1',
        //   cijenaNocenja: '45',
        //   opis: "Iznajmljujem povoljan apartman za sve informacije zovite na broj mobitela!"
        // },
        // {
        //   id: 'a2',
        //   nazivObjekta: 'Stan u Rijeci',
        //   tipObjekta: 'stan',
        //   ulica: 'Maksimilijana Vrhovca 19',
        //   grad: 'Rijeka',
        //   postanskiBroj: '51000',
        //   povrsinaApartmana: '62',
        //   brojOsoba: '4',
        //   brojLezaja: '2',
        //   cijenaNocenja: '22',
        //   opis: "Iznajmljujem povoljan stan u Rijeci pogodan za studente."
        // }
      ],
      user: {},
      isLoggedIn: false
    }
  },
  mutations: {
    noviApartman(state, payload) {
      state.apartmani.push(payload);
    },
    postaviApartmane(state, payload) {
      state.apartmani = payload;
    },
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
    noviApartman(context, data) {
      const apartmanId = firebase.firestore().collection('apartmani').doc();
      // console.log('Korisnik:', this.korisnik);
      // const userId = 'Mihael';
      const podatciApartmana = {
          userId: data.userId,
          nazivObjekta: data.nazivObjekta,
          tipObjekta: data.tipObjekta,
          ulica: data.ulica,
          grad: data.grad,
          postanskiBroj: data.postanskiBroj,
          povrsinaApartmana: data.povrsinaApartmana,
          brojOsoba: data.brojOsoba,
          brojLezaja: data.brojLezaja,
          cijenaNocenja: data.cijenaNocenja,
          opis: data.opis
      }

      apartmanId.set({
        ...podatciApartmana
      }).then(() => {
        console.log("Document seccessfully written!");
      }).catch((error) => {
        console.log(error);
      })

      context.commit('noviApartman', {
        ...podatciApartmana,
        apartmanId: apartmanId
      });
    },
    ucitajApartmane(context) {
      // const apartmanId = context.rootGetters.apartmanId;
      firebase.firestore().collection("apartmani").get().then((querySnapshot) => {
        const apartmani = [];
        querySnapshot.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            const apartman = {
              id: doc.id,
              ...doc.data()
            };
            // console.log('Apartman:',apartman)
            apartmani.push(apartman)

          });
          context.commit('postaviApartmane', apartmani);
          // console.log('Apartmani:', apartmani);
        });
      // var docRef = firebase.firestore().collection("apartmani");
      // console.log(docRef);

      // docRef.get().then((doc) => {
      //     if (doc.exists) {
      //       const apartmani = [];
      //       for (const key in doc) {
      //         const apartman = {
      //           userId: doc[key].userId,
      //           nazivObjekta: doc[key].nazivObjekta,
      //           tipObjekta: doc[key].tipObjekta,
      //           ulica: doc[key].ulica,
      //           grad: doc[key].grad,
      //           postanskiBroj: doc[key].postanskiBroj,
      //           povrsinaApartmana: doc[key].povrsinaApartmana,
      //           brojOsoba: doc[key].brojOsoba,
      //           brojLezaja: doc[key].brojLezaja,
      //           cijenaNocenja: doc[key].cijenaNocenja,
      //           opis: doc[key].opis
      //         };
      //         apartmani.push(apartman)
      //       }

      //       context.commit('postaviApartmane', apartmani);
      //       console.log("Document data:", doc.data());
      //     } else {
      //       // doc.data() will be undefined in this case
      //       console.log("No such document!");
      //     }
      // }).catch((error) => {
      //     console.log("Error getting document:", error);
      // });
    }
  },
  getters: {
    apartmani(state) {
      return state.apartmani;
    },
    // Provjeravamo da li postoje apartmani u listi
    sadrziApartmane(state) {
      return state.apartmani && state.apartmani.length > 0;
    },
    korisnik(state) {
      return state.korisnik;
    },
  }
}