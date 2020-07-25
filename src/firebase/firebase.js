import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDr-5G20-nf99u3Hc08Pp4BmFoVLGScnu8",
  authDomain: "kudos-6539b.firebaseapp.com",
  databaseURL: "https://kudos-6539b.firebaseio.com",
  projectId: "kudos-6539b",
  storageBucket: "kudos-6539b.appspot.com",
  messagingSenderId: "635822426812",
  appId: "1:635822426812:web:ac386ff0ea1b7907a3deb9",
  measurementId: "G-Z6FCN954XR",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
