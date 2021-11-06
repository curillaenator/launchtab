import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyCUwIN5IBgCq8bJBIEPYGRwcMA-7uYW86Q",
  authDomain: "launch-grid.firebaseapp.com",
  projectId: "launch-grid",
  storageBucket: "launch-grid.appspot.com",
  messagingSenderId: "835802745353",
  appId: "1:835802745353:web:e7e9ef3d9303fbc8c386d8",
  measurementId: "G-HSX4PVPN35",
};

export const app = firebase.initializeApp(firebaseConfig);

// firebase.firestore().enablePersistence();

export const auth = app.auth();
export const fsdb = app.firestore();
