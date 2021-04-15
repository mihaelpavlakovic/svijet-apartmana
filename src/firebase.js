// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

 // Your web app's Firebase configuration
 var firebaseConfig = {
  apiKey: "AIzaSyDQPhPjIl8YSeF776KDXi9r3oTJ26z6M64",
  authDomain: "svijet-apartmana-a0cb0.firebaseapp.com",
  projectId: "svijet-apartmana-a0cb0",
  storageBucket: "svijet-apartmana-a0cb0.appspot.com",
  messagingSenderId: "281083461325",
  appId: "1:281083461325:web:fe24ed6963fd688c88b384"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase