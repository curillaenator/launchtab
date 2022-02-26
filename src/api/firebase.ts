import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// export const firebaseConfig = {
//   apiKey: "AIzaSyCUwIN5IBgCq8bJBIEPYGRwcMA-7uYW86Q",
//   authDomain: "launch-grid.firebaseapp.com",
//   projectId: "launch-grid",
//   storageBucket: "launch-grid.appspot.com",
//   messagingSenderId: "835802745353",
//   appId: "1:835802745353:web:e7e9ef3d9303fbc8c386d8",
//   measurementId: "G-HSX4PVPN35",
// };

const firebaseConfig = {
  apiKey: "AIzaSyDO6QJz2VYi_WfmdGXVTERx0lZZqxh7xig",
  authDomain: "launchtab-81b06.firebaseapp.com",
  projectId: "launchtab-81b06",
  storageBucket: "launchtab-81b06.appspot.com",
  messagingSenderId: "862212900546",
  appId: "1:862212900546:web:d804f07dbbd3381ca4dd5b",
  measurementId: "G-2WJV9X5747",
};

export const app = firebase.initializeApp(firebaseConfig);

// firebase.firestore().enablePersistence();

export const auth = app.auth();
export const fsdb = app.firestore();
