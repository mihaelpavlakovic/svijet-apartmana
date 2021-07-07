import firebase from './firebase'

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
    console.log(setUser);
    firebase.firestore().collection('users').doc(setUser.id).set(setUser);
    // Korisnik je ulogiran
    this.$store.commit('korisnik/setUser', setUser);
  } else {
    // Korisnik nije ulogiran
    this.$store.commit('korisnik/setUser', null)
  }
})
