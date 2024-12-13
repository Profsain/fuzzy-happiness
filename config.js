// import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyDyBx7keaAPfVOBXkIclNOyUeV10VUJHHI",
  authDomain: "splinx-app-2a5a9.firebaseapp.com",
  projectId: "splinx-app-2a5a9",
  storageBucket: "splinx-app-2a5a9.appspot.com",
  messagingSenderId: "792263487097",
  appId: "1:792263487097:web:e48983656a498c8372eea8"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}