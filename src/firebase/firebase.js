import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
  //Firebase config
  
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "=",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
