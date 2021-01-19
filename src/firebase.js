import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCcB2a5BtfJhnZuU6zCMyAoStbFtOsbEKQ",
  authDomain: "facebook-messanger-4d981.firebaseapp.com",
  databaseURL: "https://facebook-messanger-4d981-default-rtdb.firebaseio.com",
  projectId: "facebook-messanger-4d981",
  storageBucket: "facebook-messanger-4d981.appspot.com",
  messagingSenderId: "71517928816",
  appId: "1:71517928816:web:2f82c7a2425a27e85623b5",
  measurementId: "G-19ZD7C3ZSN",
});

const db = firebaseApp.firestore();

export default db;
